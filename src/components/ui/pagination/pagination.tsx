import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MPagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((/* theme*/) => createStyles({
  root: {
    '& > *': {
      // marginTop: theme.spacing(2),
    },
  },
}));

export type PaginationProps = {
  /** 何ページまでか */
  limitCount: number;
  page: number;
  onChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { limitCount, onChange, page } = props;
  const classes = useStyles();

  /* State */
  const [pageState, setPageState] = useState(page);

  /* Callback */
  const handleChangePage = useCallback(
    (_: any, pageNum: number) => {
      if (pageNum !== pageState) {
        setPageState(pageNum);
        onChange(pageNum - 1);
      }
    },
    [onChange, pageState],
  );

  return (
    <div className={classes.root}>
      <MPagination
        className="pagination"
        count={limitCount}
        boundaryCount={pageState}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={pageState}
        onChange={handleChangePage}
      />
    </div>
  );
};
