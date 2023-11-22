import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Bottomservice=()=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={2}>
            <div className="service-item">
                <div className="image">
                  <img src="assets/booking-1634319183743.svg" alt="" />
                </div>
                <div className="descriptImage">
                  <p>Đặt chuyến bay</p>
                </div>
            </div>
        </Grid>
        <Grid item xs={6} md={2}>
            <div className="service-item">
                <div className="image">
                  <img src="assets/buymore-1634319183745.svg" alt="" />
                </div>
                <div className="descriptImage">
                  <p>Mua hành lý, suất ăn, chọn chỗ...</p>
                </div>
            </div>
        </Grid>
        <Grid item xs={6} md={2}>
            <div className="service-item">
                <div className="image">
                  <img src="assets/checkin-1634319183747.svg" alt="" />
                </div>
                <div className="descriptImage">
                  <p>Ưu tiên làm thủ tục nhanh</p>
                </div>
            </div>
        </Grid>
        <Grid item xs={6} md={2}>
            <div className="service-item">
                <div className="image">
                  <img src="assets/skyshop-1634319233320.svg" alt="" />
                </div>
                <div className="descriptImage">
                  <p>Quà lưu niệm</p>
                </div>
            </div>
        </Grid>
        <Grid item xs={6} md={2}>
            <div className="service-item">
                <div className="image">
                  <img src="assets/insurance-1634319183751.svg" alt="" />
                </div>
                <div className="descriptImage">
                  <p>Bảo hiểm</p>
                </div>
            </div>
        </Grid>
        <Grid item xs={6} md={2}>
            <div className="service-item">
                <div className="image">
                  <img src="assets/hotelbus-1634319183749.svg" alt="" />
                </div>
                <div className="descriptImage">
                  <p>Sky Holidays</p>
                </div>
            </div>
        </Grid>
        
      </Grid>
    </Box>
  );
}
