import React from 'react';
import {gql} from 'apollo-boost';

export const GET_CONTINENTS = gql`
    query{
        continents{
            code
            name
        }
    }
`;

export const  LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password)
    }
`;

export const GET_USERID = gql`
    query findUserbyName($email: String!){
        findUserbyName(email: $email){
            id
            name
            grade
        }
    }
`;