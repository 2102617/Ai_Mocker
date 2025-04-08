"use client"; // Required for Clerk and styled-components

import { SignUp } from '@clerk/nextjs';
import React from 'react';
import styled from 'styled-components';

export default function Page() {
  return (
    <StyledWrapper>
      <div className="container">
        {/* Left Side - Image */}
        <div className="image-side">
          <div className="card-image" />
        </div>

        {/* Right Side - Sign In Form */}
        <div className="form-side">
            <SignUp />
          </div>
        </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;

  .container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Left side - Image */
  .image-side {
    flex: 1;
    position: relative;
    background-color: rgba(1, 1, 1, 0.1);
  }

  .card-image {
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('/mock.jpg'); /* Make sure the image is in the 'public' folder */
    transition: transform 0.3s ease;
  }

  .card-image:hover {
    transform: scale(1.05);
  }

  /* Right side - SignIn form */
  .form-side {
    flex: 1;
    padding: 2em;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-wrapper {
    width: 100%;
    max-width: 400px;
    background: #000;
    padding: 0em;
    box-shadow: 0 4px 2px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
  }

  /* For form fields inside SignIn */
  .clerk-sign-in {
    width: 100%;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      height: auto;
      width: 100%;
    }

    .image-side,
    .form-side {
      flex: 1 1 100%;
      height: 250px; /* Adjust height for smaller screens */
    }

    .card-image {
      height: 250px;
    }
  }
`;