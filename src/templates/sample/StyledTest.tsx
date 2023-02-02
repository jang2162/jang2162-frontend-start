'use client'

import React from 'react';

import {styled} from 'styled-components';

export const StyledTest = styled.button`
    ${tw`text-4xl font-bold underline`}
    color: ${({color, type}) => color ?? 'red'};
`
