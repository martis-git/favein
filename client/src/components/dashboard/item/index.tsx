import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEntity, getActions, updateEntity } from 'store/entities/service'
import TextField from 'components/text-field'
import DashboardActions from './dashboard-actions'
import './index.scss'

const { updateDTODetails, setMutationState, resetDTODetails, setCurrent } = getActions('dashboards')

type Props = {
    dashboard: IDashboard;
    showAuthor?: boolean;
    showActions?: boolean;
}

const DashboardItem = (props: Props) => {
    const { dashboard, showAuthor = true, showActions = false } = props
    const { author, background, id, name } = dashboard
    const { payload, mutationState, current } = useSelector((state: IGlobalState) => state.dashboards)
    const dispatch = useDispatch()

    const currentState = (current?.id === id) ? mutationState : 'preview'
    const isEditing = currentState === 'edit'
    const isPreview = currentState === 'preview'

    const link = isEditing ? '#' : `/dashboards/${id}`

    const getValue = (name: keyof IDashboardDTO & keyof IDashboard) => {
        // FIXME: apply not for all items!
        switch(currentState) {
            case 'preview':
                return dashboard[name]
            case 'edit':
                return payload[name] || dashboard[name] || ''
            case 'create':
                return payload[name] || ''
        }
    }
    const onChange: OnChange = (e) => {
        const { name, value } = e.target
        dispatch(updateDTODetails({ [name]: value }))
    }

    const onSave = () => {
        dispatch(setMutationState('preview'))
        dispatch(updateEntity('dashboards'))
    }
    const onEdit = () => {
        dispatch(setMutationState('edit'))
        dispatch(setCurrent(dashboard as any))
        dispatch(resetDTODetails())
        console.log('EDIT: impl')
    }
    const onCancel = () => {
        dispatch(setMutationState('preview'))
    }

    const onDelete = () => {
        dispatch(deleteEntity('dashboards', id))
    }

    return (
        <Card className="dashboard dashboard-item" bg="dark" text="white">
            <Card.Img src={background} alt={`${author.username}/${name}`} />
            <Link to={link} className="dashboard-link">
                <Card.ImgOverlay>
                    <Card.Title className="dashboard-name">
                        <TextField
                            name="name"
                            value={getValue('name')}
                            onChange={onChange}
                            mutationState={currentState}
                            inline
                        />
                    </Card.Title>
                    <section>
                        <TextField
                            name="description"
                            value={getValue('description')}
                            onChange={onChange}
                            mutationState={currentState}
                            inline
                        />
                    </section>
                    {showAuthor && (
                        <Card.Text>{author.username}&nbsp;&lt;{author.email}&gt;</Card.Text>
                    )}
                </Card.ImgOverlay>
            </Link>
            {showActions && (
                <DashboardActions
                    onDelete={isPreview ? onDelete : undefined}
                    onEdit={isPreview ? onEdit : undefined}
                    onCancel={isEditing ? onCancel : undefined}
                    onSave={isEditing ? onSave : undefined}
                />
            )}
        </Card>
    )
}

export default DashboardItem
