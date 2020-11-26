import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DeclarativeDetailsDisplay, { DeclarativeDetailInterface } from './DeclarativeDetailsDisplay'

describe('Component: DeclarativeDetailsDisplay.test', () => {
  const mockDeclarativeDetials: DeclarativeDetailInterface[] = [
    {
      key: '0',
      type: 'EMAIL',
      content: 'jesse@iovlabs.org'
    },
    {
      key: '1',
      type: 'NAME',
      content: 'Jesse Clark'
    }
  ]

  it('renders the component', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay handleDelete={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the content in a row', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay handleDelete={jest.fn()} details={mockDeclarativeDetials} />)
    expect(wrapper.find('tbody').children()).toHaveLength(2)

    expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('EMAIL')
    expect(wrapper.find('tr').at(1).find('td').at(1).text()).toBe('jesse@iovlabs.org')
  })

  it('handles deleting an item', async () => {
    const handleDelete = jest.fn(() => new Promise((resolve) => resolve(true)))
    const wrapper = mount(<DeclarativeDetailsDisplay handleDelete={handleDelete} details={mockDeclarativeDetials} />)

    wrapper.find('tr').at(1).find('button.delete').simulate('click')
    expect(wrapper.find('.delete-modal')).toBeDefined()

    await act(async () => {
      await wrapper.find('.delete-modal').find('button.confirm').simulate('click')
      expect(handleDelete).toBeCalledTimes(1)
    })
  })
})
