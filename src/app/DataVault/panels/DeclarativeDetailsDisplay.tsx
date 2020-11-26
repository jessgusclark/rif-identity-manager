import React, { useState } from 'react'
import Panel from '../../../components/Panel/Panel'
import declarativeIcon from '../../../assets/images/icons/declarative-details.svg'
import pencilIcon from '../../../assets/images/icons/pencil.svg'
import trash from '../../../assets/images/icons/trash.svg'
import BinaryModal from '../../../components/Modal/BinaryModal'

export interface DeclarativeDetailInterface {
  key: string;
  type: string;
  content: string;
  handleDelete: (key: string) => Promise<any>
}

interface DeclarativeDetailsDisplayInterface {
  details?: DeclarativeDetailInterface[]
}

const DeclarativeDetailsDisplay: React.FC<DeclarativeDetailsDisplayInterface> = ({ details, handleDelete }) => {
  const [deleteItem, setDeleteItem] = useState<string | null>(null)
  const title = <><img src={declarativeIcon} /> Declarative Details</>
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
                <button className="icon"><img src={pencilIcon} alt="Edit" /></button>
                <button className="icon" onClick={() => setDeleteItem(item.key)}>
                  <img src={trash} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BinaryModal
        title="Are you sure you want to delete?"
        show={!!deleteItem}
        strings={{ text: 'Do you want to delete this item from the data vault?', confirm: 'Yes', deny: 'No' }}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
      />
    </Panel>
  )
}

export default DeclarativeDetailsDisplay
