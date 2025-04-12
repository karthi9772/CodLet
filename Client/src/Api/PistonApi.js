import axios from 'axios';

const PistonApi = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

/** ✅ Fetch list of supported languages */
export const fetchLanguages = async () => {
    try {
        const response = await PistonApi.get('/runtimes');
        return response.data; // Returns an array of supported languages
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
};

/** ✅ Execute Code */
export const runCode = async (language, code, stdin = '') => {
    try {
        const response = await PistonApi.post('/execute', {
            language,
            version: '*', // Latest version
            files: [{ content: code }],
            stdin, // Optional input
        });
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        return { run: { stdout: '', stderr: 'Execution failed.' } };
    }
};

export default PistonApi;
