import { DiaglogProps } from '@/atoms/dialog/Dialog.types';
import { FC, useEffect, useRef, useState } from 'react';
import { category } from '../category/category.type';
import { DiaglogContainer } from '@/atoms/dialog/DiaglogContainer';
import { Styled } from './Styled';
import ToggleSwitch from '@/atoms/toggle/ToggleSwitch';
import { DividerSvg } from '@/assets/divider';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { ColorPicker } from '@/atoms/picker/ColorPicker';

interface EditCategoryProps extends DiaglogProps {
  category: category;
  budgeted: number;
}

export const EditCategory: FC<EditCategoryProps> = (props) => {
  const { category, budgeted } = props;

  const [dividerWidth, setDividerWidth] = useState('20');
  const sectionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offsetWidth = sectionContainerRef?.current?.offsetWidth;
    if (!offsetWidth) return;
    setDividerWidth((offsetWidth * 1).toString());
  }, [sectionContainerRef]);

  const onBudgetTypeChange = () => {};

  return (
    <DiaglogContainer {...props} headerText={'Edit Category'}>
      <Styled.container>
        <Styled.sectionContainer ref={sectionContainerRef}>
          <ToggleSwitch onToggle={onBudgetTypeChange} options={['Income', 'Expense']} />
          <DividerSvg width={dividerWidth} height="1" />
          <Styled.sectionInput value={category.emoji} />
          <DividerSvg width={dividerWidth} height="1" />
          <Styled.sectionInput
            value={formatAsMoney(budgeted)}
            placeholder="$0.00"
            isempty={(budgeted < 0.0).toString()}
          />
          <DividerSvg width={dividerWidth} height="1" />
          <ColorPicker />
        </Styled.sectionContainer>
      </Styled.container>
    </DiaglogContainer>
  );
};
