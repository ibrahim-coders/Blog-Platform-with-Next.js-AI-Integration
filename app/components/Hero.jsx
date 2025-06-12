'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import FromModal from './FromModal';

if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    borderRadius: '1rem',
    border: 'none',
    boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
    background: '#314158',

    color: '#fff',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
};
const Hero = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setTitle('');
    setContent('');
    setTags('');
    setLoading(false);
  }

  return (
    <>
      <section className="bg-slate-900 lg:grid lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl  px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Discover Amazing Stories
            </h1>
            <p className="mt-4 text-base text-pretty text-white  sm:text-lg/relaxed">
              A modern blog platform powered by AI to help you write, discover,
              and share incredible content
            </p>
            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <button
                onClick={openModal}
                className="inline-block rounded border border-emerald-600 bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 cursor-pointer"
              >
                Start Writing
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <FromModal
          closeModal={closeModal}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          tags={tags}
          setTags={setTags}
          loading={loading}
          setLoading={setLoading}
        />
      </Modal>
    </>
  );
};

export default Hero;
