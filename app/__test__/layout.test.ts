import React from 'react';
import { render } from '@testing-library/react-native';
import Layout from '../_layout';

describe('Layout Component', () => {
    it('renders the Stack component with the correct options', () => {
        const { getByTestId } = render(<Layout />);


        const stackComponent = getByTestId('stack-component');
        expect(stackComponent).toBeTruthy();


        expect(stackComponent.props.screenOptions.headerShown).toBe(false);
    });
});