import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import { Button } from '@/atoms/button/Button';
import { ApiContext } from '@/stores/contexts/api.context';

export type informParentCbStatus = 'success' | 'error';

interface LinkPlaidProps {
  children?: React.ReactNode;
  informParent?: (status: informParentCbStatus) => void; // Only needed if parent needs to be informed or onSuccessCb is not present
  isReadyCb?: (ready: boolean) => void;
  onSuccess?: (publicToken: string) => void;
  mode?: 'add' | 'update';
  itemId?: string;
}

export const LinkPlaid: FC<LinkPlaidProps> = ({
  children,
  informParent,
  onSuccess,
  isReadyCb,
  mode = 'add',
  itemId,
}) => {
  const [tokenHash, setTokenHash] = useState<string>('');
  const [linkToken, setLinkToken] = useState<string>('');
  const { PlaidApi: bankApi } = useContext(ApiContext);

  useEffect(() => {
    const fetchLinkToken = async () => {
      console.log('itemId', itemId);
      let token;
      if (mode === 'update' && itemId) {
        token = await bankApi.getLinkToken(mode, itemId);
      } else {
        token = await bankApi.getLinkToken(mode);
      }
      setLinkToken(token);
    };
    fetchLinkToken();
  }, [tokenHash, mode, itemId]);

  const plaidOnSuccess = useCallback(
    async (publicToken: string, metaData: PlaidLinkOnSuccessMetadata) => {
      setTokenHash(publicToken);

      if (onSuccess) {
        return onSuccess(publicToken);
      }

      const extra = mode === 'update' ? { update: true } : {};
      await bankApi
        .syncLinkedAccounts(publicToken, { ...metaData, ...extra })
        .then(() => {
          informParent && informParent('success');
        })
        .catch(() => {
          informParent && informParent('error');
        });
    },
    [mode, onSuccess, informParent, bankApi]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    onSuccess: plaidOnSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (!isReadyCb) return;

    isReadyCb(ready);
  }, [ready]);

  return (
    <div onClick={() => open()}>
      {children ? children : <Button disabled={!ready}>Link</Button>}
    </div>
  );
};
