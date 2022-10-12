import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import Modal from 'react-modal';
import "../../styles/forms.css";
import { FaTimes, FaPlusCircle, FaArrowAltCircleUp, FaArrowAltCircleDown, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { customStyles } from "./shared";

Modal.setAppElement('#root');

function AddNewsModal({ isOpen, closeModal }) {
    const defaultFormValues = {
        title: '',
        content: '',
        imageUrl: '',
        tags: ['News Tag'],
        links: [{
            title: '',
            url: ''
        }],
        date: new Date().toLocaleDateString('en-US')
    };

    const { register, control, reset, handleSubmit } = useForm({ defaultValues: defaultFormValues});
    const { fields: tagInputs, append: appendTag, remove: removeTag, swap: swapTags } = useFieldArray({
            control,
            name: "tags"
    });

    const { fields: linkInputs, append: appendLink, remove: removeLink, swap: swapLinks} = useFieldArray({
        control,
        name: "links"
    });

    const moveTagUp = (index) => {
        swapTags(index, index - 1);
    }

    const moveTagDown = (index) => {
        swapTags(index, index + 1);
    }

    const moveLinkUp = (index) => {
        swapLinks(index, index - 1);
    }

    const moveLinkDown = (index) => {
        swapLinks(index, index + 1);
    }

    const getTimestamp = (inputDate) => {
        const [month, day, year] = inputDate.split('/');
        return Timestamp.fromDate(new Date(year, month - 1, day));
    }

    const validateInput = (data) => {
        const isLinkIncomplete = (links) => {
            let isIncomplete = false;
            links.forEach(link => {
                if (link.title.trim() === '' && link.url.trim() !== '') {
                    isIncomplete = true;
                }

                if (link.title.trim() !== '' && link.url.trim() === '') {
                    isIncomplete = true;
                }
            })

            return isIncomplete;
        }

        if (data.title.trim() === '') {
            toast.error("Please add a title to the post.")
        } else if (data.content.trim() === '') {
            toast.error("Please add the content.")
        } else if (data.date.trim() === '') {
            toast.error("Please add the date of the post.");
        } else if (isNaN(getTimestamp(data.date).seconds)) {
            toast.error('Invalid date');
        } else if (isLinkIncomplete(data.links)) {
            toast.error("Every link should have both: a title and the address.");
        } else {
            submitPost(data);
        }
    }

    const submitPost = async (data) => {
        
        const tagsToSubmit = [];
        const linksToSubmit = [];
        
        data.tags.forEach(tag => {
            if (tag.trim() !== '' && tag.trim() !== 'News Tag') {
                tagsToSubmit.push(tag);
            }
        });
        
        data.links.forEach(link => {
            if (link.title.trim() !== '' && link.url.trim() !== '') {
                linksToSubmit.push(link);
            }
        });

        const dataToSubmit = {
            ...data,
            date: getTimestamp(data.date),
            tags: tagsToSubmit,
            links: linksToSubmit
        };

        try {
            await addDoc(collection(db, 'news'), dataToSubmit);
            toast.success(`New post was succesfully added.`);
            onModalClose();
        } catch (error) {
            console.log(error);
            toast.error('Could not add a new post.');
        }
    }

    const onModalClose = () => {
        reset(defaultFormValues);
        closeModal();
    }

    const afterOpenModal = () => {
        reset(defaultFormValues);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add a another news"
            >
                <button className="close-modal" onClick={onModalClose}><FaTimes/></button>

                <div className="page-header">
                    <h2>Add news</h2>                  
                </div>
                <form onSubmit={handleSubmit(validateInput)}>
                    <label className="form-label">
                        Title
                    </label>
                    <input type="text" placeholder="Title of the news record" {...register('title')}/>
                    
                    <label className="form-label">
                        Date (MM/DD/YYYY)
                    </label>
                    <input {...register('date')} placeholder='MM/DD/YYY' />

                    <label className="form-label">
                        Content
                    </label>
                    <textarea type="text" placeholder="What is it about" {...register('content')} />
                    

                    <label className="form-label">
                        Image URL
                    </label>
                    <input type="text" placeholder="Link a picture to this news record (optional)" {...register('imageUrl')}/>
                    

                    <label className="form-label">
                        Tags
                    </label>
                                   
                        {
                            tagInputs.map((tag, index) => (
                                <div className="tag-input" key={tag.id}>
                                    <input type="text" placeholder="News Tag" {...register(`tags.${index}`)} />

                                    <div className="control-buttons">    
                                        {tagInputs.length > 1 &&         
                                            <>
                                                {
                                                    index > 0 &&
                                                    <FaArrowAltCircleUp className='dark-blue pointer' onClick={() => moveTagUp(index)} />
                                                }
                                                {
                                                    index < tagInputs.length - 1 &&
                                                    <FaArrowAltCircleDown className='dark-blue pointer' onClick={() => moveTagDown(index)}/>
                                                }
                                            </>    
                                        }
                                        <FaTrashAlt className='red pointer' onClick={() => removeTag(index)} />                                    
                                    </div>
                                </div>
                            ))
                        }
                    <div className='flex-row'>
                        <button type="button" className="add-button pointer" onClick={() => appendTag('Another Tag')}>
                            <FaPlusCircle className='add-icon'/> Add Tag
                        </button>        
                    </div>

                    <label className="form-label">
                        Links
                    </label>
                    
                    {
                        linkInputs.map((link, index) => (
                            <div className="link-input" key={link.id}>
                                <input type="text" placeholder="Title of the link" {...register(`links.${index}.title`)} />
                                <input type="text" placeholder="Link address" {...register(`links.${index}.url`)} />

                                 <div className="control-buttons">    
                                        {linkInputs.length > 1 &&         
                                            <>
                                                {
                                                    index > 0 &&
                                                    <FaArrowAltCircleUp className='dark-blue pointer' onClick={() => moveLinkUp(index)} />
                                                }
                                                {
                                                    index < linkInputs.length - 1 &&
                                                    <FaArrowAltCircleDown className='dark-blue pointer' onClick={() => moveLinkDown(index)}/>
                                                }
                                            </>    
                                        }
                                        <FaTrashAlt className='red pointer' onClick={() => removeLink(index)} />                                    
                                    </div>
                            </div>
                        ))
                    }

                    <div className='flex-row'>
                        <button type="button" className="add-button pointer" onClick={() => appendLink({title: '', url: ''})}>
                            <FaPlusCircle className='add-icon'/> Add Link
                        </button>        
                    </div>
                    
                    <div className="page-header">
                        <button className="btn" type="submit">Submit</button>
                    </div>

                </form>
            </Modal>
        </div>
  )
}

export default AddNewsModal