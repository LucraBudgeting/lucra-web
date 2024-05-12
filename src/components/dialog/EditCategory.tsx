import { FC, useEffect, useRef, useState } from 'react';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import ToggleSwitch from '@/atoms/toggle/ToggleSwitch';
import { DividerSvg } from '@/assets/divider';
import { ColorPicker } from '@/atoms/picker/ColorPicker';
import { balanceEntry, textToBalanceEntry } from '@/types/types';
import { category } from '../category/category.type';
import { Styled } from './Styled';
import { EmojiPicker } from '@/atoms/picker/EmojiPicker';

interface EditCategoryProps extends DialogProps {
  category: category;
  budgeted: number;
}

export const EditCategory: FC<EditCategoryProps> = (props) => {
  const { category, budgeted } = props;
  const [categoryColor, setCategoryColor] = useState<string | undefined>(category.backgroundColor);
  const [_budetType, setBudgetType] = useState<balanceEntry>(category.budgetType ?? 'debit');
  const [currentEmoji, setCurrentEmoji] = useState<string>(category.emoji ?? '👍');
  const [budgetedAmount, setBudgetedAmount] = useState(budgeted);

  const [dividerWidth, setDividerWidth] = useState('20');
  const sectionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offsetWidth = sectionContainerRef?.current?.offsetWidth;
    if (!offsetWidth) return;
    setDividerWidth((offsetWidth * 1).toString());
  }, [sectionContainerRef]);

  const onBudgetTypeChange = (budgetType: string) => {
    setBudgetType(textToBalanceEntry(budgetType));
  };

  function onBudgetedChange(budgeted: number) {
    if (budgeted) {
      setBudgetedAmount(budgeted);
    } else {
      setBudgetedAmount(0);
    }
  }

  const onEmojiChange = (emoji: string) => {
    setCurrentEmoji(emoji);
  };

  const onColorChange = (color: string) => {
    setCategoryColor(color);
  };

  return (
    <DialogContainer {...props} headerText={'Edit Category'}>
      <Styled.container>
        <Styled.sectionContainer ref={sectionContainerRef}>
          <ToggleSwitch onToggle={onBudgetTypeChange} options={['Income', 'Expense']} />
          <DividerSvg width={dividerWidth} height="1" />
          <EmojiPicker currentEmoji={currentEmoji} onSelect={onEmojiChange} />
          <DividerSvg width={dividerWidth} height="1" />
          <Styled.sectionCurrencyInput
            initialValue={budgetedAmount}
            handleChange={onBudgetedChange}
            isempty={(budgetedAmount <= 0.0).toString()}
          />
          <DividerSvg width={dividerWidth} height="1" />
          <ColorPicker onClick={onColorChange} selectedColor={categoryColor} />
        </Styled.sectionContainer>
      </Styled.container>
    </DialogContainer>
  );
};
