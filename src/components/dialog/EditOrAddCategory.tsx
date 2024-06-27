import { FC, useEffect, useRef, useState } from 'react';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import ToggleSwitch from '@/atoms/toggle/ToggleSwitch';
import { DividerSvg } from '@/assets/divider';
import { ColorPicker } from '@/atoms/picker/ColorPicker';
import { balanceEntryToText, textToBalanceEntry } from '@/types/types';
import { EmojiPicker } from '@/atoms/picker/EmojiPicker';
import { ICategory } from '../../types/basic/Category.type';
import { Styled } from './Styled';

interface EditCategoryProps extends DialogProps {
  category?: ICategory;
  budgeted: number;
}

export const EditOrAddCategory: FC<EditCategoryProps> = (props) => {
  const { category, budgeted, headerText, successCb } = props;
  const [categoryColor, setCategoryColor] = useState<string | undefined>(
    category?.avatar.backgroundColor
  );
  const [budetType, setBudgetType] = useState<string>(
    balanceEntryToText(category?.budgetType ?? 'debit')
  );
  const [label, setLabel] = useState<string>(category?.label ?? '');
  const [currentEmoji, setCurrentEmoji] = useState<string>(category?.avatar.emoji ?? '💰');
  const [budgetedAmount, setBudgetedAmount] = useState(budgeted);

  const [dividerWidth, setDividerWidth] = useState('20');
  const sectionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offsetWidth = sectionContainerRef?.current?.offsetWidth;
    if (!offsetWidth) return;
    setDividerWidth((offsetWidth * 1).toString());
  }, [sectionContainerRef]);

  const onBudgetTypeChange = (budgetType: string) => {
    setBudgetType(budgetType);
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

  const labelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const onColorChange = (color: string) => {
    setCategoryColor(color);
  };

  const saveCategory = () => {
    if (!successCb) return;

    const savedCategory: ICategory = {
      id: category?.id ?? undefined,
      label: label,
      avatar: {
        emoji: currentEmoji,
        backgroundColor: categoryColor ?? '#50de21aa',
      },
      budgetType: textToBalanceEntry(budetType),
      amount: budgetedAmount,
    };
    successCb(savedCategory);
  };

  const isSaveDisabled = () => !label || !categoryColor || budgetedAmount <= 0.0;

  return (
    <DialogContainer
      {...props}
      headerText={headerText}
      successCb={saveCategory}
      disableSave={isSaveDisabled()}
    >
      <Styled.container>
        <Styled.sectionContainer ref={sectionContainerRef}>
          <Styled.sectionItem>
            <ToggleSwitch
              defaultValue={budetType}
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
            <Styled.sectionInput placeholder="Category Name" value={label} onChange={labelChange} />
          </Styled.sectionItem>
          <DividerSvg width={dividerWidth} height="1" />
          <Styled.sectionItem>
            <Styled.sectionCurrencyInput
              initialValue={budgetedAmount}
              handleChange={onBudgetedChange}
              isempty={(budgetedAmount <= 0.0).toString()}
            />
          </Styled.sectionItem>
          <DividerSvg width={dividerWidth} height="1" />
          <ColorPicker onClick={onColorChange} selectedColor={categoryColor} />
        </Styled.sectionContainer>
      </Styled.container>
    </DialogContainer>
  );
};
