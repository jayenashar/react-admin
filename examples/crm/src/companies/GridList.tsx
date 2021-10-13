import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { useListContext, Identifier } from 'react-admin';

import { CompanyCard } from './CompanyCard';
import { Company } from '../types';

const PREFIX = 'ImageList';

const classes = {
    gridList: `${PREFIX}-gridList`,
    paper: `${PREFIX}-paper`,
};

const times = (nbChildren: number, fn: (key: number) => any) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => (
    <Box display="flex" flexWrap="wrap" width={1008} gap={10}>
        {times(15, key => (
            <Paper
                sx={{
                    height: 200,
                    width: 194,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'grey[200]',
                }}
                key={key}
            />
        ))}
    </Box>
);

const LoadedGridList = () => {
    const { ids, data } = useListContext<Company>();

    if (!ids || !data) return null;

    return (
        <Box className={classes.gridList}>
            {ids.map((id: Identifier) => (
                <CompanyCard key={id} record={data[id]} />
            ))}
        </Box>
    );
};

export const ImageList = () => {
    const { loaded } = useListContext();
    return loaded ? <LoadedGridList /> : <LoadingGridList />;
};