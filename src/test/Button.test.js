import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { PageButton } from '../styles/TableStyles';
import '@testing-library/jest-dom';

const testButton = {
        palette: {
        background: { default: '#f9f9f9', paper: '#ffffff' },
        text: { primary: '#262626' },
        primary: { main: '#FFFFFF' }, 
        secondary: { main: '#135846', dark: '#0e3a2d' }, 
        },
        styles: {
        button: {
            borderRadius: '8px',
            padding: '.5rem .9rem',
            disabled: { backgroundColor: '#E0E0E0', color: '#A0A0A0' },
            hover: { backgroundColor: '#135846', color: '#ffffff' },
        },
        },
    };




    const renderWithTheme = (ui) => render(<ThemeProvider theme={testButton}>{ui}</ThemeProvider>);
    
    describe('PageButton Component', () => {
        let handleClick;
    
        beforeEach(() => {
        handleClick = jest.fn();
        });

            /* 1. RENDERING*/
    
        describe('Rendering', () => {
        test('Should render correctly with the provided text', () => {
            renderWithTheme(<PageButton>1</PageButton>);

            expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
        });
        });


        /* 2. STYLES TEST*/
    
        describe('Properties and Styles', () => {
        test('Should apply the active style when $active is RECIVED', () => {
            renderWithTheme(<PageButton $active={true}>2</PageButton>);

            const button = screen.getByRole('button', { name: /2/i });
            expect(button).toHaveAttribute('data-active', 'true');
        });
    
        test('Should be disabled when DISABLED is TRUE', () => {
            renderWithTheme(<PageButton disabled>Prev</PageButton>);
            
            const button = screen.getByRole('button', { name: /prev/i });
            expect(button).toBeDisabled();
        });
        });

            /* 3. EVENTS*/
    
    
        describe('Events', () => {
        test('Should call `onClick` when its clicked', () => {
            renderWithTheme(<PageButton onClick={handleClick}>3</PageButton>);
            fireEvent.click(screen.getByRole('button', { name: /3/i }));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    
        test('Should not call `onClick` if its disabled', () => {
            renderWithTheme(
            <PageButton disabled onClick={handleClick}>Next</PageButton>
            );
            fireEvent.click(screen.getByRole('button', { name: /next/i }));
            expect(handleClick).not.toHaveBeenCalled();
        });
        });
    });
