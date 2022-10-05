import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import Modal from 'react-modal';
import "../../styles/forms.css";
import { FaTimes, FaPlusCircle } from 'react-icons/fa';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: 'var(--light-blue-background)',
    padding: '2rem',
    transform: 'translate(-50%, -50%)',
    border: '',
    borderBottom: 'solid var(--green) 2px',
    borderRadius: '10px',
    color: 'var(--green)'
  },
};

Modal.setAppElement('#root');

function NewsModal({ isOpen, closeModal, onSubmit }) {
    const { register, control, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            title: '',
            content: '',
            imageUrl: '',
            tags: ['Tag #1'],
            links: [{
                title: '',
                url: ''
            }],
            date: new Date().toLocaleDateString('en-US')
        }
    });

    const { fields: tagInputs, append: appendTag } = useFieldArray({
            control,
            name: "tags"
    });

    const { fields: linkInputs, append: appendLink } = useFieldArray({
    control,
    name: "links"
    });

    const validateInput = (data) => {
        console.log(data);
        onSubmit();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add a another news"
            >
                <button className="close-modal" onClick={closeModal}><FaTimes/></button>

                <div className="page-header">
                    <h2>Add news</h2>                  
                </div>
                <form onSubmit={handleSubmit(validateInput)}>
                    <label className="form-label">
                        Title
                    </label>
                    <input type="text" placeholder="Title of the news record" {...register('title', {required: true})}/>
                    
                    <label className="form-label">
                        Date (MM/DD/YYYY)
                    </label>
                    <input {...register('date')} placeholder='MM/DD/YYY' />
                    

                    <label className="form-label">
                        Tags
                    </label>
                    
                    {
                        tagInputs.map((tag, index) => (
                            <div key={index}>
                                <input {...register(`tags.${index}`)} />
                            </div>
                        ))
                    }

                    <FaPlusCircle onClick={() => appendTag('Tag #' + Number(tagInputs.length + 1))} />

                    <label className="form-label">
                        Links
                    </label>
                    
                    {
                        linkInputs.map((tag, index) => (
                            <div key={index}>
                                <input {...register(`links.${index}.title`)} />
                                <input {...register(`links.${index}.url`)} />
                            </div>
                        ))
                    }

                    <FaPlusCircle onClick={() => appendLink({title: 'Link title', url: 'Link url'})} />
                    
                    <div className="page-header">
                        <button className="btn" type="submit">Submit</button>
                    </div>

                </form>
            </Modal>
        </div>
  )
}

export default NewsModal