import React from 'react'
import DeclarativeDetailsDisplay, { DeclarativeDetailInterface } from './panels/DeclarativeDetailsDisplay'
import AddDeclarativeDetails from './panels/AddDeclarativeDetails'

interface DataVaultComponentProps {
  declarativeDetails: DeclarativeDetailInterface[],
  addDeclarativeDetail: (key: string, content: string) => Promise<any>
  deleteDeclarativeDetail: (key: string) => Promise<any>
  editDeclaarativeDetail: (detail: DeclarativeDetailInterface) => Promise<any>
}

const DataVaultComponent: React.FC<DataVaultComponentProps> = ({
  addDeclarativeDetail, declarativeDetails, deleteDeclarativeDetail, editDeclaarativeDetail
}) => {
  return (
    <div className="content data-vault">
      <div className="container">
        <div className="column">
          <AddDeclarativeDetails submitData={addDeclarativeDetail} />
        </div>
      </div>
      <div className="container">
        <div className="column">
          <DeclarativeDetailsDisplay
            details={declarativeDetails}
            handleDelete={deleteDeclarativeDetail}
            handleEdit={editDeclaarativeDetail}
          />
        </div>
      </div>
    </div>
  )
}

export default DataVaultComponent
