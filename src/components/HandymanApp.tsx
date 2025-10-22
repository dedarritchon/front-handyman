import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownCoordinator,
  DropdownItem,
  DropdownItemIcon,
  Icon,
  NestedDropdownProvider,
} from '@frontapp/ui-kit';
import styled from 'styled-components';

import { CATEGORY_LABELS, TOOLS } from '../constants/tools';
import { useFavorites } from '../context/FavoritesContext';
import { useSelectedTool } from '../context/SelectedToolContext';
import { Tool, ToolCategory } from '../types/tools';
import ToolContent from './layout/ToolContent';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  height: 0; /* This is important for flex to work properly */
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 5px;
`;

const CoffeeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoffeeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  color: var(--text-primary);
  overflow: hidden;

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const CoffeeIcon = styled.span`
  font-size: 0.875rem;
`;

const CoffeeText = styled.span`
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.2s ease;
  white-space: nowrap;
  color: var(--text-secondary);

  ${CoffeeButton}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;


const LeftSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: 10px;
`;

const SelectWrapper = styled.div`
  min-width: 200px;
  padding: 10px;
`;

function HandymanApp() {
  const { selectedTool, setSelectedTool } = useSelectedTool();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const handleToolChange = (tool: Tool, onClose: () => void) => {
    setSelectedTool(tool);
    onClose();
  };


  const handleToggleFavorite = () => {
    if (selectedTool) {
      toggleFavorite(selectedTool.id);
    }
  };

  // Group tools by category for display
  const toolsByCategory: Record<string, Tool[]> = {
    favorites: TOOLS.filter((t) => favorites.has(t.id)),
    calculators: TOOLS.filter((t) => t.category === 'calculators'),
    converters: TOOLS.filter((t) => t.category === 'converters'),
    utilities: TOOLS.filter((t) => t.category === 'utilities'),
    'cx-tools': TOOLS.filter((t) => t.category === 'cx-tools'),
  };

  return (
    <NestedDropdownProvider
      config={{
        openDelay: 200,
        closeDelay: 500,
        maxDepth: 2,
        placement: 'right-start',
        enableKeyboardNavigation: true,
      }}
    >
      <AppContainer>
        <HeaderContainer>
          <HeaderContent>
            <LeftSection>
              <SelectWrapper>
                <DropdownCoordinator
                  placement="bottom-start"
                  renderButton={(isOpen, isDisabled, buttonRef) => (
                    <div ref={buttonRef}>
                      <DropdownButton
                        value={
                          selectedTool
                            ? [`${selectedTool.icon} ${selectedTool.name}`]
                            : []
                        }
                        isActive={isOpen}
                        isDisabled={isDisabled}
                        placeholder="Select a tool"
                      />
                    </div>
                  )}
                  renderDropdown={(onRequestClose) => {
                    const categoryIcons: Record<
                      ToolCategory,
                      'Archive' | 'Star' | 'Calendar'
                    > = {
                      calculators: 'Archive',
                      converters: 'Star',
                      utilities: 'Calendar',
                      'cx-tools': 'Star',
                    };

                    const categoryColors: Record<ToolCategory, string> = {
                      calculators: '#4A90E2',
                      converters: '#4CAF50',
                      utilities: '#FF9800',
                      'cx-tools': '#9C27B0',
                    };

                    const categories: ToolCategory[] = [
                      'calculators',
                      'converters',
                      'utilities',
                      'cx-tools',
                    ];

                    // Get favorited tools
                    const favoriteTools = TOOLS.filter((tool) =>
                      favorites.has(tool.id)
                    );

                    return (
                      <Dropdown shouldUseItemsHeight maxWidth={200}>
                        {/* Favorites section - always visible */}
                        <DropdownItem
                          submenuId="favorites"
                          height={36}
                          submenu={
                            <Dropdown shouldUseItemsHeight maxWidth={250}>
                              {favoriteTools.length > 0 ? (
                                favoriteTools.map((tool) => (
                                  <DropdownItem
                                    key={tool.id}
                                    height={36}
                                    onClick={() =>
                                      handleToolChange(tool, onRequestClose)
                                    }
                                    isSelected={
                                      tool.id === selectedTool?.id
                                    }
                                  >
                                    {tool.icon} {tool.name}
                                  </DropdownItem>
                                ))
                              ) : (
                                <DropdownItem
                                  key="no-favorites"
                                  height={36}
                                >
                                  No favorites
                                </DropdownItem>
                              )}
                            </Dropdown>
                          }
                        >
                          <DropdownItemIcon
                            color="#FFD700"
                            iconName="Star"
                          />
                          Favorites {favoriteTools.length > 0 && `(${favoriteTools.length})`}
                        </DropdownItem>

                        {/* Categories with submenus */}
                        {categories.map((category) => {
                          const categoryTools = toolsByCategory[category];

                          return (
                            <DropdownItem
                              key={category}
                              submenuId={`tool-${category}`}
                              height={36}
                              submenu={
                                <Dropdown shouldUseItemsHeight maxWidth={250}>
                                  {categoryTools.map((tool) => (
                                    <DropdownItem
                                      key={tool.id}
                                      height={36}
                                      onClick={() =>
                                        handleToolChange(tool, onRequestClose)
                                      }
                                      isSelected={
                                        tool.id === selectedTool?.id
                                      }
                                    >
                                      {tool.icon} {tool.name}
                                    </DropdownItem>
                                  ))}
                                </Dropdown>
                              }
                            >
                              <DropdownItemIcon
                                color={categoryColors[category]}
                                iconName={categoryIcons[category]}
                              />
                              {CATEGORY_LABELS[category]}
                            </DropdownItem>
                          );
                        })}
                      </Dropdown>
                    );
                  }}
                />
              </SelectWrapper>
            </LeftSection>
            <RightSection>
              {selectedTool && (
                <Button type="icon" onClick={handleToggleFavorite}>
                  <Icon
                    name={isFavorite(selectedTool.id) ? 'StarFilled' : 'Star'}
                  />
                </Button>
              )}
            </RightSection>
          </HeaderContent>
        </HeaderContainer>
        <ContentArea>
          <ToolContent selectedTool={selectedTool} />
        </ContentArea>
        <Footer>
          <CoffeeButtonContainer>
            <CoffeeButton 
              href="https://buymeacoffee.com/dedarritchon" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <CoffeeText>Buy me a coffee</CoffeeText>
              <CoffeeIcon>☕</CoffeeIcon>
            </CoffeeButton>
          </CoffeeButtonContainer>
        </Footer>
      </AppContainer>
    </NestedDropdownProvider>
  );
}

export default HandymanApp;

