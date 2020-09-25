import React from 'react'
import {
  Typography,
  Card,
  Divider,
  List,
  CardActionArea,
  CardActions,
  Button,
  Avatar,
} from '@material-ui/core';

function Test() {
  return (
    <div>
      <Card outlined style={{ width: '30rem' }}>
        <span>
          <Avatar
            alt="NYTimes"
            src="https://d24wuq6o951i2g.cloudfront.net/img/events/id/457/457735294/assets/bea.NYT-logo-2.png"
          />
          <Typography
            use="subtitle1"
            tag="div"
            style={{ padding: '0.5rem 1rem' }}
            theme="textSecondaryOnBackground"
          >
            Headlines
          </Typography>
        </span>
        <Divider />

        <CardActionArea>
          <div style={{ padding: '1rem' }}>
            <Typography use="headline5" tag="div">
              Copper on the rise
            </Typography>
            <Typography
              use="body1"
              tag="p"
              theme="textSecondaryOnBackground"
            >
              Copper price soars amid global market optimism and
              increased demand.
            </Typography>
          </div>
        </CardActionArea>

        <Divider />

        <CardActionArea>
          <div style={{ padding: '1rem' }}>
            <Typography use="headline5" tag="div">
              U.S. tech startups rebound
            </Typography>
            <Typography
              use="body1"
              tag="p"
              theme="textSecondaryOnBackground"
            >
              Favorable business conditions have allowed startups to
              secure more fundraising deals compared to last year.
            </Typography>
          </div>
        </CardActionArea>

        <Divider />

        <CardActionArea>
          <div style={{ padding: '1rem' }}>
            <Typography use="headline5" tag="div">
              Asia's clean energy ambitions
            </Typography>
            <Typography
              use="body1"
              tag="p"
              theme="textSecondaryOnBackground"
            >
              China plans to invest billions of dollars for the
              development of over 300 clean energy projects in
              Southeast Asia.
            </Typography>
          </div>
        </CardActionArea>

        <Divider />

        <CardActions fullBleed>
          <Button
            label="All Business Headlines"
            trailingIcon="arrow_forward"
          />
        </CardActions>
      </Card>
    </div>
  );
}

export default Test
