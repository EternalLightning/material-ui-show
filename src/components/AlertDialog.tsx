import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type AlertDialogProps = {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose: () => void;
  copyText?: string | null;
};

const AlertDialog: React.FC<AlertDialogProps> = ({ open, title, content, onClose, copyText = null }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      sx={{ '& .MuiPaper-root': { minWidth: 360 } }}
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
          {/* 支持传入任意 ReactNode（如包含可滚动 detail 的 Box） */}
          {content}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          {copyText ? (
            <Button
              onClick={handleCopy}
              variant="contained"
              color="info"
              startIcon={<ContentCopyIcon />}
              sx={{
                  minWidth: 120,
                  color: 'common.white',
                  '&:hover': {
                      backgroundColor: 'info.dark'
                  }
              }}
            >
              {copied ? '已复制' : '复制'}
            </Button>
          ) : null}
          <Button
            onClick={onClose}
            variant="contained"
            color="info"
            sx={{
              minWidth: 120,
              color: 'common.white',
              '&:hover': {
                backgroundColor: 'info.dark'
              }
            }}
            autoFocus
          >
            确定
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
