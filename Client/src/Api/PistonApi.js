import axios from 'axios';

const PistonApi = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

export const fetchLanguages = async () => {
    try {
        const response = await PistonApi.get('/runtimes');
        return response.data; 
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
};

export const runCode = async (language, code, stdin = '') => {
    try {
        const response = await PistonApi.post('/execute', {
            language,
            version: '*', 
            files: [{ content: code }],
            stdin, 
        });
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        return { run: { stdout: '', stderr: 'Execution failed.' } };
    }
};

export default PistonApi;
