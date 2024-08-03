import { FC, useEffect, useRef, useState } from 'react';
import ToggleSwitch from '@/atoms/toggle/ToggleSwitch';
import { DividerSvg } from '@/assets/divider';
import { EmojiPicker } from '@/atoms/picker/EmojiPicker';
import { Styled } from '../dialog/Styled';

interface EditCategoryProps {
  budgetType: string;
  onBudgetTypeChange: (budgetType: string) => void;
  label: string;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentEmoji: string;
  onEmojiChange: (emoji: string) => void;
  budgetedAmount: number;
  onBudgetedChange: (budgeted: number) => void;
}

export const EditOrAddCategory: FC<EditCategoryProps> = ({
  budgetType,
  onBudgetTypeChange,
  label,
  onLabelChange,
  currentEmoji,
  onEmojiChange,
  budgetedAmount,
  onBudgetedChange,
}) => {
  const [dividerWidth, setDividerWidth] = useState('20');
  const sectionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offsetWidth = sectionContainerRef?.current?.offsetWidth;
    if (!offsetWidth) return;
    setDividerWidth((offsetWidth * 1).toString());
  }, [sectionContainerRef]);

  return (
    <Styled.container>
      <Styled.sectionContainer ref={sectionContainerRef}>
        <Styled.sectionItem>
          <ToggleSwitch
            defaultValue={budgetType}
            onToggle={onBudgetTypeChange}
            options={['Income', 'Expense']}
          />
        </Styled.sectionItem>
        <DividerSvg width={dividerWidth} height="1" />
        <Styled.sectionItem>
          <EmojiPicker currentEmoji={currentEmoji} onSelect={onEmojiChange} />
        </Styled.sectionItem>
        <DividerSvg width={dividerWidth} height="1" />
        <Styled.sectionItem>
          <Styled.sectionInput
            id="category_name_input"
            placeholder="Category Name"
            value={label}
            onChange={onLabelChange}
          />
        </Styled.sectionItem>
        <DividerSvg width={dividerWidth} height="1" />
        <Styled.sectionItem>
          <Styled.sectionCurrencyInput
            id="category_currency_input"
            initialValue={budgetedAmount}
            handleChange={onBudgetedChange}
            isempty={(budgetedAmount <= 0.0).toString()}
          />
        </Styled.sectionItem>
        {/* <DividerSvg width={dividerWidth} height="1" /> */}
        {/* <ColorPicker onClick={onColorChange} selectedColor={categoryColor} /> */}
      </Styled.sectionContainer>
    </Styled.container>
  );
};
