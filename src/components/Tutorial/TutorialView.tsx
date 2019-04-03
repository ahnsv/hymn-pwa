import React from 'react'
import { RouteChildrenProps } from 'react-router';
import { HymnForm, HymnInput } from '../UI/Forms'


const TutorialView = (props: RouteChildrenProps) => (
    <div className="hymn-tutorial">
        <HymnForm>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
            <HymnInput<String> label="hello" type="text"></HymnInput>
        </HymnForm>
    </div>
)

export { TutorialView }