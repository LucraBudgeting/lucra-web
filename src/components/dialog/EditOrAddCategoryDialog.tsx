import { FC, useState } from 'react';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { ICategory } from '@/types/basic/Category.type';
import { balanceEntry, balanceEntryToText, textToBalanceEntry } from '@/types/types';
import { RandomColor } from '@/atoms/picker/ColorPicker';
import { EditOrAddCategory } from '../budget/EditOrAddCategory';

interface EditOrAddCategoryDialogProps extends DialogProps {
  category?: ICategory;
  budgeted: number;
  initialBudgetType?: balanceEntry;
}

export const EditOrAddCategoryDialog: FC<EditOrAddCategoryDialogProps> = (props) => {
  const { category, budgeted, headerText, successCb, initialBudgetType } = props;

  const [budgetType, setBudgetType] = useState<string>(
    balanceEntryToText(category?.budgetType ?? initialBudgetType ?? 'debit')
  );
  const [label, setLabel] = useState<string>(category?.label ?? '');
  const [currentEmoji, setCurrentEmoji] = useState<string>(category?.avatar.emoji ?? '💰');
  const [budgetedAmount, setBudgetedAmount] = useState(budgeted ?? 0);

  const saveCategory = () => {
    if (!successCb) return;

    const savedCategory: ICategory = {
      id: category?.id ?? undefined,
      label: label,
      avatar: {
        emoji: currentEmoji,
        backgroundColor: RandomColor(),
      },
      budgetType: textToBalanceEntry(budgetType),
      amount: budgetedAmount,
    };
    successCb(savedCategory);
  };

  const isSaveDisabled = () => !label;

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

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  return (
    <DialogContainer
      {...props}
      headerText={headerText ? headerText : 'Add Category'}
      successCb={saveCategory}
      disableSave={isSaveDisabled()}
    >
      <EditOrAddCategory
        budgetType={budgetType}
        onBudgetTypeChange={onBudgetTypeChange}
        label={label}
        onLabelChange={onLabelChange}
        currentEmoji={currentEmoji}
        onEmojiChange={onEmojiChange}
        budgetedAmount={budgetedAmount}
        onBudgetedChange={onBudgetedChange}
      />
    </DialogContainer>
  );
};
