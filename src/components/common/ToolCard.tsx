import { ReactNode } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  max-width: 100%;
`;

const CardTitle = styled.h2`
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #6c757d;
`;

interface ToolCardProps {
  title: string;
  icon: string;
  description: string;
  children: ReactNode;
}

function ToolCard({ title, icon, description, children }: ToolCardProps) {
  return (
    <Card>
      <CardTitle>
        <span>{icon}</span>
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
      {children}
    </Card>
  );
}

export default ToolCard;

