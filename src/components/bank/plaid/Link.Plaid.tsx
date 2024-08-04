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
}

export const LinkPlaid: FC<LinkPlaidProps> = ({ children, informParent, onSuccess, isReadyCb }) => {
  const [tokenHash, setTokenHash] = useState<string>('');
  const [linkToken, setLinkToken] = useState<string>('');
  const { PlaidApi: bankApi } = useContext(ApiContext);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const token = await bankApi.getLinkToken();
      setLinkToken(token);
    };
    fetchLinkToken();
  }, [tokenHash]);

  const plaidOnSuccess = useCallback(
    async (publicToken: string, metaData: PlaidLinkOnSuccessMetadata) => {
      setTokenHash(publicToken);

      if (onSuccess) {
        return onSuccess(publicToken);
      }

      await bankApi
        .syncLinkedAccounts(publicToken, metaData)
        .then(() => {
          informParent && informParent('success');
        })
        .catch(() => {
          informParent && informParent('error');
        });
    },
    []
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
