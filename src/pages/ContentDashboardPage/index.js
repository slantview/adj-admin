import { Container } from '@material-ui/core';
import React from 'react';
import BlogList from '../../components/BlogList';

export default function ContentDashboardPage() {
    return (
        <>
            <Container>
                <h1>Dashboard</h1>
                <p>This is where we dashboard at</p>
                <BlogList />
            </Container>
        </>
    );
}
