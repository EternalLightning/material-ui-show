// FileUploadButton.tsx
import React, { useRef, useState } from 'react';
import { Button, Chip, Box } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface FileUploadButtonProps {
  accept?: string;           // 例如 ".jpg,.png" 或 "image/*"
  onFileSelect?: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  accept,
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
    // 允许再次选择同一个文件
    e.target.value = '';
  };

  return (
    <Box display="inline-flex" alignItems="center" gap={1}>
      {/* 隐藏的文件输入 */}
      <input
        type="file"
        accept={accept}
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      {/* 主按钮 */}
      <Button
        variant="contained"
        color={'inherit'}
        startIcon={<UploadFileIcon />}
        onClick={handleClick}
        sx={{marginRight: 2}}
      >
        选择方案文件
      </Button>

    </Box>
  );
};

export default FileUploadButton;