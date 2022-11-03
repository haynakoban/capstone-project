/* <Box
          sx={{
            width: '100wv',
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(100px, 50%))',
              sm: 'repeat(3, minmax(100px, 33%))',
              md: 'repeat(4, minmax(100px, 25%))',
            },
            gridTemplateRows: 'repeat(4, minmax(auto, 23%))',
            alignContent: 'start',
            height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
            overflow: 'hidden',
          }}
        >
          {[1, 2].slice(0, 16).map((_, index) => (
            <VideoPlayer key={index} />
          ))}
        </Box> */
