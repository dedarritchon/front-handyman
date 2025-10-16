import styled from 'styled-components';

import { Tool } from '../../types/tools';

const ContentContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  height: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const EmptyTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const EmptyDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6c757d;
`;

interface ToolContentProps {
  selectedTool: Tool | null;
}

function ToolContent({ selectedTool }: ToolContentProps) {
  if (!selectedTool) {
    return (
      <ContentContainer>
        <EmptyState>
          <EmptyIcon>🛠️</EmptyIcon>
          <EmptyTitle>Welcome to Handyman</EmptyTitle>
          <EmptyDescription>
            Select a tool from the dropdown above to get started
          </EmptyDescription>
        </EmptyState>
      </ContentContainer>
    );
  }

  const ToolComponent = selectedTool.component;

  return (
    <ContentContainer>
      <ToolComponent />
    </ContentContainer>
  );
}

export default ToolContent;

