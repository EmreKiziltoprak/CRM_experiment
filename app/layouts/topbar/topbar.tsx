import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const TopBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CRM App 1.0.0
        </Typography>
        <Button color="inherit">
          <Link href="/" passHref>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/about" passHref>
            About
          </Link>
        </Button>
        {/* Add more buttons as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
