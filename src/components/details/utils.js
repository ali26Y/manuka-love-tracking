import moment from 'moment';

export const generateTableData = data => [
    {
        title: 'Batch Number/ID',
        value: data.batchId,
    },
    {
        title: 'UMF Certification',
        value: data.analyticaFile.filename.substring(0, 16) + '...pdf',
        link: data.analyticaFile._meta.Location,
    },
    {
        title: 'MGO',
        value: data.mgo,
    },
    {
        title: 'RMP',
        value: data.rmpId,
    },
    {
        title: 'MFG Date',
        value: moment(data.mfgDate_utc).format('Do MMMM YYYY'),
    },
    {
        title: 'BB Date',
        value: moment(data.bbDate_utc).format('Do MMMM YYYY'),
    },
    {
        title: 'Beehive Location',
        value: data.location.area,
    },
];
