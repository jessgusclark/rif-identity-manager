import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import pencilIcon from '../../../assets/images/icons/pencil.svg'
import trash from '../../../assets/images/icons/trash.svg'
import BinaryModal from '../../../components/Modal/BinaryModal'
import Modal from '../../../components/Modal/Modal'
import { BaseButton } from '../../../components/Buttons'

export interface DeclarativeDetailInterface {
  key: string
  type: string
  content: string
}

interface DeclarativeDetailsDisplayInterface {
  details?: DeclarativeDetailInterface[]
  handleDelete: (key: string) => Promise<any>
  handleEdit: (detail: DeclarativeDetailInterface) => Promise<any>
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details, handleDelete, handleEdit }) => {
  const [deleteItem, setDeleteItem] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editItem, setEditItem] = useState<DeclarativeDetailInterface | null>(null)
  const [newEditValue, setEditValue] = useState<string>('')
  const [isError, setIsError] = useState<null | string>(null)

  const title = <><img src={declarativeIcon} /> Declarative Details</>

  const toggleEdit = (item: DeclarativeDetailInterface) => {
    setIsError(null)
    setEditItem(item)
    setEditValue(item.content)
  }

  const handleError = (err: Error) => {
    setIsLoading(false)
    setIsError(err.message)
  }

  const handleDeleteItem = () => {
    setIsLoading(true)
    deleteItem && handleDelete(deleteItem)
      .then(() => {
        setDeleteItem(null)
        setIsLoading(false)
      })
      .catch((err: Error) => handleError(err))
  }

  const handleEditDetail = () => {
    setIsLoading(true)
    editItem && handleEdit(editItem)
      .then(() => {
        setEditItem(null)
        setIsLoading(false)
      })
      .catch((err: Error) => handleError(err))
  }

  return (
    <Panel title={title} className="display">
      <table>
        <thead>
          <tr>
            <th className="type">Type</th>
            <th className="content">Content</th>
            <th className="options">Options</th>
          </tr>
        </thead>
        <tbody>
          {details?.map((item: DeclarativeDetailInterface) => (
            <tr key={item.key}>
              <td>{item.type}</td>
              <td>{item.content}</td>
              <td>
                <button className="edit icon" onClick={() => toggleEdit(item)}>
                  <img src={pencilIcon} alt="Edit" />
                </button>
                <button className="delete icon" onClick={() => setDeleteItem(item.key)}>
                  <img src={trash} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BinaryModal
        title="Are you sure you want to delete?"
        className="delete-modal"
        show={!!deleteItem}
        strings={{ text: 'Do you want to delete this item from the data vault?', confirm: 'Yes', deny: 'No' }}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteItem}
        disabled={isLoading}
      />

      <Modal
        show={!!editItem}
        className="edit-modal"
        title="Edit Declarative Detail"
        onClose={() => setEditItem(null)}
      >
        <p>New value:</p>
        <textarea
          value={newEditValue}
          className="edit-text line"
          onChange={evt => setEditValue(evt.target.value)}
          disabled={isLoading}
        ></textarea>

        <BaseButton
          className="blue"
          disabled={isLoading}
          onClick={handleEditDetail}>Save</BaseButton>
        {isError && <div className="alert error">{isError}</div>}
      </Modal>
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
