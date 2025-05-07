import {GridColDef, GridRowsProp} from "@mui/x-data-grid";

const bus_rows: GridRowsProp = [
    {id: 1, bus_num: 1, type: 3, mag: 1.0, angle: 0, max: 1, min: 1},
    {id: 2, bus_num: 2, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 3, bus_num: 3, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 4, bus_num: 4, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 5, bus_num: 5, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 6, bus_num: 6, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 7, bus_num: 7, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 8, bus_num: 8, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 9, bus_num: 9, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 10, bus_num: 10, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 11, bus_num: 11, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 12, bus_num: 12, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 13, bus_num: 13, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 14, bus_num: 14, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 15, bus_num: 15, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 16, bus_num: 16, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 17, bus_num: 17, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 18, bus_num: 18, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 19, bus_num: 19, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 20, bus_num: 20, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 21, bus_num: 21, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 22, bus_num: 22, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 23, bus_num: 23, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 24, bus_num: 24, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 25, bus_num: 25, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 26, bus_num: 26, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 27, bus_num: 27, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 28, bus_num: 28, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 29, bus_num: 29, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 30, bus_num: 30, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 31, bus_num: 31, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 32, bus_num: 32, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
    {id: 33, bus_num: 33, type: 1, mag: 1.0, angle: 0, max: 1.05, min: 0.9},
];

const bus_columns: GridColDef[] = [
    {field: 'bus_num', headerName: '母线编号', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'type', headerName: '节点类型', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'mag', headerName: '电压幅值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'angle', headerName: '电压相角', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'max', headerName: '电压最大值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'min', headerName: '电压最小值', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const branch_rows: GridRowsProp = [
    {id: 1, from: 1, to: 2, r: 0.0922, x: 0.0470, b: 0, S_max: 6, I_max: 10},
    {id: 2, from: 2, to: 3, r: 0.4930, x: 0.2511, b: 0, S_max: 6, I_max: 10},
    {id: 3, from: 3, to: 4, r: 0.3660, x: 0.1864, b: 0, S_max: 6, I_max: 10},
    {id: 4, from: 4, to: 5, r: 0.3811, x: 0.1941, b: 0, S_max: 6, I_max: 10},
    {id: 5, from: 5, to: 6, r: 0.8190, x: 0.7070, b: 0, S_max: 6, I_max: 10},
    {id: 6, from: 6, to: 7, r: 0.1872, x: 0.6188, b: 0, S_max: 4.5, I_max: 10},
    {id: 7, from: 7, to: 8, r: 0.7114, x: 0.2351, b: 0, S_max: 4.5, I_max: 10},
    {id: 8, from: 8, to: 9, r: 1.0300, x: 0.7400, b: 0, S_max: 4.5, I_max: 10},
    {id: 9, from: 9, to: 10, r: 1.0440, x: 0.7400, b: 0, S_max: 4.5, I_max: 10},
    {id: 10, from: 10, to: 11, r: 0.1966, x: 0.0650, b: 0, S_max: 4.5, I_max: 10},
    {id: 11, from: 11, to: 12, r: 0.3744, x: 0.1238, b: 0, S_max: 4.5, I_max: 10},
    {id: 12, from: 12, to: 13, r: 1.4680, x: 1.1550, b: 0, S_max: 4.5, I_max: 10},
    {id: 13, from: 13, to: 14, r: 0.5416, x: 0.7129, b: 0, S_max: 4.5, I_max: 10},
    {id: 14, from: 14, to: 15, r: 0.5910, x: 0.5260, b: 0, S_max: 4.5, I_max: 10},
    {id: 15, from: 15, to: 16, r: 0.7463, x: 0.5450, b: 0, S_max: 4.5, I_max: 10},
    {id: 16, from: 16, to: 17, r: 1.2890, x: 1.7210, b: 0, S_max: 4.5, I_max: 10},
    {id: 17, from: 17, to: 18, r: 0.7320, x: 0.5740, b: 0, S_max: 4.5, I_max: 10},
    {id: 18, from: 2, to: 19, r: 0.1640, x: 0.1565, b: 0, S_max: 4.5, I_max: 10},
    {id: 19, from: 19, to: 20, r: 1.5042, x: 1.3554, b: 0, S_max: 4.5, I_max: 10},
    {id: 20, from: 20, to: 21, r: 0.4095, x: 0.4784, b: 0, S_max: 4.5, I_max: 10},
    {id: 21, from: 21, to: 22, r: 0.7089, x: 0.9373, b: 0, S_max: 4.5, I_max: 10},
    {id: 22, from: 3, to: 23, r: 0.4512, x: 0.3083, b: 0, S_max: 4.5, I_max: 10},
    {id: 23, from: 23, to: 24, r: 0.8980, x: 0.7091, b: 0, S_max: 4.5, I_max: 10},
    {id: 24, from: 24, to: 25, r: 0.8960, x: 0.7011, b: 0, S_max: 4.5, I_max: 10},
    {id: 25, from: 6, to: 26, r: 0.2030, x: 0.1034, b: 0, S_max: 4.5, I_max: 10},
    {id: 26, from: 26, to: 27, r: 0.2842, x: 0.1447, b: 0, S_max: 4.5, I_max: 10},
    {id: 27, from: 27, to: 28, r: 1.0590, x: 0.9337, b: 0, S_max: 4.5, I_max: 10},
    {id: 28, from: 28, to: 29, r: 0.8042, x: 0.7006, b: 0, S_max: 4.5, I_max: 10},
    {id: 29, from: 29, to: 30, r: 0.5075, x: 0.2585, b: 0, S_max: 4.5, I_max: 10},
    {id: 30, from: 30, to: 31, r: 0.9744, x: 0.9630, b: 0, S_max: 4.5, I_max: 10},
    {id: 31, from: 31, to: 32, r: 0.3105, x: 0.3619, b: 0, S_max: 4.5, I_max: 10},
    {id: 32, from: 32, to: 33, r: 0.3410, x: 0.5302, b: 0, S_max: 4.5, I_max: 10},

];

const branch_columns: GridColDef[] = [
    {field: 'from', headerName: '起始节点', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'to', headerName: '终止节点', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'r', headerName: '支路电阻', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'x', headerName: '支路电抗', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '支路电纳', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S_max', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'I_max', headerName: '最大电流', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const gen_rows: GridRowsProp = [
    {
        id: 1,
        conn_bus: 4,
        P_max: 1,
        P_min: 0,
        Q_max: 1,
        Q_min: 0,
        S: 1.3,
        SIC: 1,
        loss: 0.1,
        a: 20,
        tu: 8000,
        CF: 200,
        eff: 0.9
    },
];

const gen_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_max', headerName: '最大有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_min', headerName: '最小有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'Q_max', headerName: '最大无功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'Q_min', headerName: '最小无功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'SIC', headerName: '动态比投资费用', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'loss', headerName: '线损率', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '经济使用寿命', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'tu', headerName: '年运行利用小时数', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'CF', headerName: '燃料费用', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'eff', headerName: '发电效率', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const solar_rows: GridRowsProp = [
    {id: 1, conn_bus: 4, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 10800, b: 0.05},
    {id: 2, conn_bus: 19, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 10800, b: 0.05},
    {id: 3, conn_bus: 23, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 10800, b: 0.05},
];

const solar_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_max', headerName: '最大有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_min', headerName: '最小有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'n', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'k', headerName: '年化率系数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const wind_rows: GridRowsProp = [
    {id: 1, conn_bus: 8, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 11520, b: 0.32},
    {id: 2, conn_bus: 14, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 11520, b: 0.32},
    {id: 3, conn_bus: 29, P_max: 0.09, P_min: 0, n: 0.9, S: 0.1, k: 0.0872, a: 11520, b: 0.32},
];

const wind_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_max', headerName: '最大有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_min', headerName: '最小有功', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'n', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'k', headerName: '年化率系数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const storage_rows: GridRowsProp = [
    {id: 1, conn_bus: 6, P_out: 0.2, P_in: 0.2, n: 0.9, S: 0.23, a: 13440, b: 0, c: 0}
];

const storage_columns: GridColDef[] = [
    {field: 'conn_bus', headerName: '相连母线', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_out', headerName: '最大输出有功', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'P_in', headerName: '最小输入有功', minWidth: 120, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'n', headerName: '功率因数', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'S', headerName: '最大容量', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'a', headerName: '单位容量投资成本', minWidth: 140, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'b', headerName: '发电成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
    {field: 'c', headerName: '运维成本', minWidth: 100, headerAlign: 'center', align: 'center', flex: 1},
];

const network_name = 'IEEE33';
const gen_num = 1;
const solar_num = 1;
const wind_num = 1;
const storage_num = 1;
const price = [0.3344, 0.3344, 0.3344, 0.3344, 0.3344, 0.3344, 0.3344, 0.5636, 0.64, 0.64, 0.64, 0.64, 0.64, 0.64, 0.937975, 1.0373, 1.0373, 1.0373, 1.0373, 1.0373, 1.0373, 1.0373, 0.64, 0.3344];
const solar_irradiance = [0, 0, 0, 0, 0, 0, 0, 0, 0.0469, 0.0875, 0.1700, 0.7477, 0.9890, 1.0000, 0.9023, 0.6751, 0.3489, 0.0241, 0, 0, 0, 0, 0, 0];
const wind_speed = [1.0000, 0.8289, 0.3338, 0.3252, 0.2411, 0, 0.4032, 0.0886, 0, 0, 0, 0, 0.2879, 0.7593, 0.7593, 0.7593, 0.7593, 0.6979, 0.6746, 0.7593, 0.7593, 0.7593, 0.3314, 0.2853];
const pd0 = [0, 100, 90, 120, 60, 60, 200, 200, 60, 60, 45, 60, 60, 120, 60, 60, 60, 90, 90, 90, 90, 90, 90, 420];

const pd = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0056, 0.0271, 0.4043, 1.0684, 4.9493, 10.102, 12.1535, 11.7993, 3.6403, 1.3322, 0.2441, 0.0326, 0.0043, 0.0003, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0003, 0.0035, 0.0255, 0.199, 1.5503, 4.558, 6.0135, 10.6136, 4.5291, 3.0011, 0.7515, 0.3828, 0.0533, 0.0018, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0003, 0.0053, 0.0283, 0.4504, 2.3086, 2.3003, 12.2074, 7.4109, 10.0402, 5.5192, 1.755, 0.3303, 0.0428, 0.0041, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0026, 0.0211, 0.2176, 0.6413, 3.0677, 4.8018, 6.6176, 1.7913, 2.1331, 0.9605, 0.2406, 0.0269, 0.0015, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0024, 0.0115, 0.1799, 0.5287, 3.5133, 4.7595, 3.0243, 4.0833, 1.9234, 0.8306, 0.0741, 0.0269, 0.0012, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0003, 0.008, 0.1577, 0.8455, 2.4118, 8.6373, 19.6301, 26.1654, 9.5829, 9.1601, 2.8845, 0.8611, 0.0603, 0.0071, 0.0003, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0069, 0.0576, 0.7436, 2.5859, 2.8708, 17.4942, 11.5869, 26.598, 6.5561, 4.0399, 0.2565, 0.0894, 0.0068, 0.0003, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0017, 0.0187, 0.2911, 0.7683, 1.6678, 6.2758, 7.0853, 2.5182, 1.7437, 0.7148, 0.1434, 0.0216, 0.0033, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0022, 0.0241, 0.1419, 0.6325, 2.5484, 4.2169, 5.7133, 4.02, 2.8083, 0.7435, 0.0167, 0.0245, 0.0016, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0.0017, 0.0206, 0.1576, 1.007, 1.9573, 2.6262, 4.0591, 4.0439, 2.1281, 0.5467, 0.0409, 0.0291, 0.0017, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0012, 0.0263, 0.1427, 0.627, 2.3929, 2.8888, 6.0965, 6.4759, 4.2133, 0.6036, 0.2868, 0.0269, 0.0016, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0.0015, 0.0223, 0.0859, 1.2441, 1.5592, 4.9076, 3.1792, 4.8384, 0.846, 1.368, 0.1029, 0.0218, 0.0026, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0.0035, 0.0433, 0.2013, 1.9188, 6.6564, 8.8384, 8.0694, 9.0289, 7.157, 1.5475, 0.5515, 0.0308, 0.003, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0025, 0.0137, 0.2643, 1.0594, 1.0222, 4.6169, 7.3787, 6.68, 2.5431, 1.1576, 0.1006, 0.0242, 0.0019, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0016, 0.0339, 0.2321, 0.6852, 2.4467, 5.9375, 7.0439, 2.3497, 1.6358, 0.7793, 0.1756, 0.0209, 0.0023, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0016, 0.0198, 0.147, 0.9831, 2.9213, 5.41, 6.1047, 1.1875, 4.1894, 0.2984, 0.0942, 0.0135, 0.0026, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0021, 0.038, 0.2253, 0.9003, 3.326, 6.2059, 10.327, 8.2369, 3.8607, 0.9251, 0.1578, 0.036, 0.0024, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0032, 0.0343, 0.1843, 0.75, 2.4661, 8.661, 10.5434, 3.6172, 3.7466, 0.6422, 0.2755, 0.0108, 0.004, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0032, 0.0342, 0.3321, 0.8554, 2.0616, 10.1064, 7.1769, 10.0683, 5.1668, 0.5293, 0.3238, 0.0326, 0.0016, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0003, 0.0041, 0.0404, 0.2581, 0.9047, 1.9946, 10.559, 9.6019, 8.0507, 4.7065, 0.6366, 0.2931, 0.0335, 0.0012, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0027, 0.0362, 0.1477, 1.0612, 5.044, 5.983, 12.3223, 4.5692, 5.7833, 1.5844, 0.2788, 0.0494, 0.0058, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0017, 0.0391, 0.1805, 1.2445, 3.3735, 6.196, 5.7479, 8.6037, 5.0553, 1.7227, 0.1596, 0.0268, 0.0029, 0.0003, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0005, 0.0073, 0.1616, 0.4867, 6.8885, 13.7296, 17.9535, 54.8015, 29.4444, 18.0267, 6.2621, 1.4187, 0.1921, 0.0155, 0.0008, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0009, 0.0219, 0.1471, 1.0976, 9.8155, 20.4283, 31.0778, 32.457, 37.4234, 14.8817, 6.2864, 0.929, 0.095, 0.0047, 0.0012, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0024, 0.018, 0.2067, 1.1502, 3.1355, 4.8848, 6.876, 6.6384, 2.4221, 0.8119, 0.2061, 0.016, 0.0016, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0.0023, 0.0115, 0.3234, 0.6493, 2.87, 4.4036, 4.2314, 6.5553, 1.6747, 1.1574, 0.1811, 0.0179, 0.002, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0011, 0.0429, 0.1639, 0.49, 1.6714, 7.4843, 8.1495, 4.1782, 3.0676, 0.8915, 0.1996, 0.0284, 0.0021, 0.0001, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0002, 0.0033, 0.0504, 0.3216, 0.9774, 5.1489, 10.5696, 5.9432, 10.4353, 6.5712, 1.2758, 0.4254, 0.0431, 0.0065, 0.0002, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0097, 0.0623, 0.2654, 2.6352, 13.0358, 14.3574, 22.3658, 17.7181, 5.6466, 2.4733, 0.6131, 0.1043, 0.0078, 0.0003, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0003, 0.0051, 0.0224, 0.4582, 0.8622, 8.2013, 16.1297, 20.2402, 11.4744, 7.5291, 2.0912, 0.1611, 0.0998, 0.0053, 0.0003, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0004, 0.0056, 0.0765, 0.5013, 3.1848, 7.9896, 9.3849, 11.6077, 11.827, 11.7941, 4.0388, 0.5932, 0.0885, 0.0103, 0.0007, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0.0001, 0.0032, 0.03, 0.1475, 1.2954, 2.8354, 5.2861, 7.6501, 6.9663, 2.1295, 0.6704, 0.1832, 0.0218, 0.0023, 0.0001, 0, 0, 0, 0],
]
const qd = pd;

const ev_demand = [
    6, 7, 5, 1, 2, 2, 2, 4, 3, 7, 12, 8, 3, 10, 6, 11, 9, 8, 9, 14, 6, 8, 9, 9
];

export const data = {
    bus_rows, bus_columns,
    branch_rows, branch_columns,
    gen_rows, gen_columns,
    solar_rows, solar_columns,
    wind_rows, wind_columns,
    storage_rows, storage_columns,
    network_name,
    gen_num, solar_num, wind_num, storage_num,
    price,
    solar_irradiance, wind_speed,
    pd, qd,
    ev_demand
}