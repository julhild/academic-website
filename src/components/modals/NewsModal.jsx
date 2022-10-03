import React from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import "../../styles/forms.css";
import { FaTimes } from 'react-icons/fa';

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

function NewsModal({isOpen, closeModal, onSubmit}) {

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
                <form>
                    <label className="form-label">Title</label>
                    <input type="text" />


                    <div className="page-header">
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
  )
}

export default NewsModal