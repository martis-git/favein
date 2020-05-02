import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { cardsSlice } from 'store/entities'
import TextField from 'components/text-field'

const { setCurrent, updateDTODetails, updateEntities } = cardsSlice.actions

const CardForm = () => {
    const dispatch = useDispatch()
    const { description = "", name = "", content = "" } = useSelector((state: IGlobalState) => state.cards.data)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        dispatch(updateDTODetails({ [name]: value }))
    }

    return (
        <Form>
            <TextField 
                label="Name"
                name="name"
                placeholder="Хуки: обзор"
                value={name}
                onChange={onChange}
            />
            <TextField 
                type="textarea"
                label="Description"
                name="description"
                placeholder="Хуки — нововведение в React 16.8, которое позволяет использовать состояние и ..."
                value={description}
                onChange={onChange}
            />
            <TextField 
                type="textarea"
                label="Content"
                name="content"
                placeholder="Первый хук, который мы изучим, это функция useState ..."
                value={content}
                onChange={onChange}
            />
        </Form>
    )
}

export default CardForm
