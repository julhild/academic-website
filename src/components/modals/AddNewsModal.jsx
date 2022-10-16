import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import Modal from 'react-modal';
import "../../styles/forms.css";
import { FaTimes, FaPlusCircle, FaArrowAltCircleUp, FaArrowAltCircleDown, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addDoc, collection} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { customStyles, defaultNewsFormValues, newsDataToSubmit, validateNewsFormInput } from "./news-modul-shared";

Modal.setAppElement('#root');

function AddNewsModal({ isOpen, closeModal }) {
    const { register, control, reset, handleSubmit } = useForm({ defaultValues: defaultNewsFormValues});
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

    const submitPost = async (data) => {
        const errorMessage = validateNewsFormInput(data);

        if (errorMessage) {
            toast.error(errorMessage);
        } else {
            try {
            const dataToSubmit = newsDataToSubmit(data);

                await addDoc(collection(db, 'news'), dataToSubmit);
                toast.success(`New post was successfully added.`);
                onModalClose();
            } catch (error) {
                console.log(error);
                toast.error('Could not add a new post.');
            }
        }
    }

    const onModalClose = () => {
        reset(defaultNewsFormValues);
        closeModal();
    }

    const afterOpenModal = () => {
        reset(defaultNewsFormValues);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add another news post"
            >
                <button className="close-modal" onClick={onModalClose}><FaTimes/></button>

                <div className="page-header">
                    <h2>Add news post</h2>                  
                </div>
                <form onSubmit={handleSubmit(submitPost)}>
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