import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { stateInterface } from '../state/configureStore'
import DataVaultComponent from './DataVaultComponent'
import { AnyAction } from 'redux'
import { DeclarativeDetailInterface } from './panels/DeclarativeDetailsDisplay'

const mockDeclarativeDetials: DeclarativeDetailInterface[] = [
  {
    key: 'dasd189as04d58',
    type: 'EMAIL',
    content: 'jesse@iovlabs.org'
  },
  {
    key: 'gdfsg09-9vbcxs',
    type: 'NAME',
    content: 'Jesse Clark'
  }
]

const mapStateToProps = (state: stateInterface) => ({
  declarativeDetails: mockDeclarativeDetials
})

// mock promise returns until code is implemented
const mapDispatchToProps = (dispatch: ThunkDispatch<stateInterface, {}, AnyAction>) => ({
  addDeclarativeDetail: (type: string, content:string) => new Promise((resolve) => resolve({ type, content })),
  deleteDeclarativeDetail: (key: string) => new Promise((resolve) => resolve(key)),
  editDeclaarativeDetail: (detail: DeclarativeDetailInterface) =>
    new Promise((resolve, reject) => reject(new Error('ohh no!'))) // resolve(detail))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataVaultComponent)
