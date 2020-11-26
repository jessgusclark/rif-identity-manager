import React from 'react'
import { BaseButton } from '../Buttons'
import Modal from './Modal'

interface OkayCancelModalInterface {
  show: boolean
  title?: string
  strings?: {
    text?: string
    confirm?: string
    deny?: string
  }
  onConfirm: () => void
  onClose: () => void
}

const OkayCancelModal: React.FC<OkayCancelModalInterface> = ({ show, title, onConfirm, onClose, strings }) => {
  return (
    <Modal show={show} onClose={onClose} title={title || 'Are you sure?'}>
      <p>{strings?.text || 'Are you sure?'}</p>
      <div className="container">
        <div className="column">
          <BaseButton onClick={onClose} className="deny gray full">
            {strings?.deny || 'Deny'}
          </BaseButton>
        </div>
        <div className="column">
          <BaseButton onClick={onConfirm} className="confirm gray full">
            {strings?.confirm || 'Confirm'}
          </BaseButton>
        </div>
      </div>
    </Modal>
  )
}

export default OkayCancelModal
