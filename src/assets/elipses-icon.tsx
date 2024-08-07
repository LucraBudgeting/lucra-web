import { FC } from 'react';

interface ElipsesIconProps {
  onClick?: () => void;
  forwardRef?: React.LegacyRef<SVGSVGElement>;
}

export const ElipsesIcon: FC<ElipsesIconProps> = ({ onClick, forwardRef }) => {
  return (
    <svg
      ref={forwardRef}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M11.1109 9.99997C11.1109 9.38632 10.6134 8.88886 9.99978 8.88886C9.38613 8.88886 8.88867 9.38632 8.88867 9.99997C8.88867 10.6136 9.38613 11.1111 9.99978 11.1111C10.6134 11.1111 11.1109 10.6136 11.1109 9.99997Z"
        stroke="#333333"
        strokeMiterlimit="10"
      />
      <path
        d="M11.1109 4.44455C11.1109 3.8309 10.6134 3.33344 9.99978 3.33344C9.38613 3.33344 8.88867 3.8309 8.88867 4.44455C8.88867 5.0582 9.38613 5.55566 9.99978 5.55566C10.6134 5.55566 11.1109 5.0582 11.1109 4.44455Z"
        stroke="#333333"
        strokeMiterlimit="10"
      />
      <path
        d="M11.1109 15.5556C11.1109 14.942 10.6134 14.4445 9.99978 14.4445C9.38613 14.4445 8.88867 14.942 8.88867 15.5556C8.88867 16.1693 9.38613 16.6667 9.99978 16.6667C10.6134 16.6667 11.1109 16.1693 11.1109 15.5556Z"
        stroke="#333333"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
