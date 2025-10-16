import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #212529;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #ffffff;
  color: #212529;
  font-size: 13px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0d6efd;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #ffffff;
  color: #212529;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0d6efd;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #ffffff;
  color: #212529;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0d6efd;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${(props) =>
    props.variant === 'primary' ? '#0d6efd' : '#e9ecef'};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#212529')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

export const Result = styled.div`
  margin-top: 12px;
  padding: 12px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
`;

export const ResultLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6c757d;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

export const ResultValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`;

