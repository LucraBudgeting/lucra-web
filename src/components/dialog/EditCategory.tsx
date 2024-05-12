import { DiaglogProps } from '@/atoms/dialog/Dialog.types';
import { FC, useEffect, useRef, useState } from 'react';
import { category } from '../category/category.type';
import { DiaglogContainer } from '@/atoms/dialog/DiaglogContainer';
import { Styled } from './Styled';
import ToggleSwitch from '@/atoms/toggle/ToggleSwitch';
import { DividerSvg } from '@/assets/divider';
import { formatAsMoney, formatMoneyAsNumber } from '@/utils/formatAsMoney';
import { ColorPicker } from '@/atoms/picker/ColorPicker';
import { balanceEntry, textToBalanceEntry } from '@/types/types';

interface EditCategoryProps extends DiaglogProps {
  category: category;
  budgeted: number;
}

export const EditCategory: FC<EditCategoryProps> = (props) => {
  const { category, budgeted } = props;

  const [categoryColor, setCategoryColor] = useState<string | undefined>(category.backgroundColor);
  const [budetType, setBudgetType] = useState<balanceEntry>(category.budgetType ?? 'debit');
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

  const onBudgetedChange = (budgeted: string) => {
    // console.log('budgeted', budgeted, formatMoneyAsNumber(budgeted));
    // setBudgetedAmount(formatMoneyAsNumber(budgeted));
    if (budgeted) {
      setBudgetedAmount(parseFloat(budgeted));
    } else {
      setBudgetedAmount(0);
    }
  };

  const onColorChange = (color: string) => {
    setCategoryColor(color);
  };

  return (
    <DiaglogContainer {...props} headerText={'Edit Category'}>
      <Styled.container>
        <Styled.sectionContainer ref={sectionContainerRef}>
          <ToggleSwitch onToggle={onBudgetTypeChange} options={['Income', 'Expense']} />
          <DividerSvg width={dividerWidth} height="1" />
          {/* <Styled.sectionInput value={category.emoji} /> */}
          <DividerSvg width={dividerWidth} height="1" />
          <Styled.sectionInput
            onChange={(e) => onBudgetedChange(e.target.value)}
            value={budgetedAmount}
            placeholder="$0.00"
            isempty={(budgeted < 0.0).toString()}
            type="currency"
          />
          <DividerSvg width={dividerWidth} height="1" />
          <ColorPicker onClick={onColorChange} selectedColor={categoryColor} />
        </Styled.sectionContainer>
      </Styled.container>
    </DiaglogContainer>
  );
};
