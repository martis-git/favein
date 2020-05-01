import React, { useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DemoSection from './demo-section'
import Comment from 'components/comment'
import Rate from 'components/rate'
import Label from 'components/label'
import User from 'components/user'
import CardSheet from 'components/card/sheet'
import List from 'components/list'
import Dashboard from 'components/dashboard'
import { readList } from 'store/card/service'

type Props = {
}

const AdminPage = (props: Props) => {
    const { cards, comments, dashboards, labels, lists, rates, users } = useSelector((state: IGlobalState) => state.shared.entities)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readList())
    }, [])

    return (
        <div className='page page-admin'>
            <DemoSection title="Comments">
                {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </DemoSection>
            <DemoSection title="Rates">
                {rates.map(rate => <Rate key={rate.id} rate={rate} />)}
            </DemoSection>
            <DemoSection title="Labels">
                {labels.map(label => <Label key={label.id} label={label} />)}
            </DemoSection>
            <DemoSection title="Users">
                {users.map(user => <User key={user.id} user={user} />)}
            </DemoSection>
            <DemoSection title="Cards Sheets" className="flex-wrap">
                {cards.slice(1, 4).map(card => <CardSheet key={card.id} card={card} />)}
            </DemoSection>
            <DemoSection title="Lists" className="flex-wrap">
                {lists.slice(1, 4).map(list => (
                    <List
                        key={list.id}
                        list={list}
                        cards={cards.filter(c => c.list.id === list.id)}
                    />
                ))}
            </DemoSection>
            <DemoSection title="Dashboards" className="flex-column w-100">
                <Tabs id="profile-dashboards-tabs">
                    {dashboards.map(dashboard => (
                        <Tab eventKey={dashboard.id} title={dashboard.name}>
                            <Dashboard
                                dashboard={dashboard}
                                lists={lists}
                                cards={cards}
                            />
                        </Tab>
                    ))}
                </Tabs>
            </DemoSection>
        </div>
    )
}

export default AdminPage
