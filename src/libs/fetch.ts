
export interface FetchRequestOpts extends RequestInit {
    params?: ConstructorParameters<typeof URLSearchParams>[0]; // type of first argument of URLSearchParams constructor.
    timeout?: number;
}

/**
 * Fetch fetches data and handles response edge cases and error handling.
 */
export async function fetchAPI(
    url: RequestInfo,
    opts: FetchRequestOpts
) {
    opts = {
        headers: {},
        method: 'get',
        timeout: 30000, // 30 secs
        ...opts, // Any other fetch options
    };

    if (!url) throw new Error('Fetch: Missing url argument');

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), opts.timeout);

    const { body, params, headers, ...otherOpts } = opts;

    const requestBody =
        body && typeof body === 'object' ? JSON.stringify(opts.body) : opts.body;

    const response = await fetch(`${url}${createParams(params)}`, {
        ...otherOpts,
        body: requestBody,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
        signal: controller.signal,
    });

    clearTimeout(id);

    const responseBody = await getBody(response);

    if (response.ok) {
        const { headers, status } = response;
        return { data: responseBody, headers, status };
    } else {
        const errorResponseBody =
            typeof responseBody === 'string' ? { error: responseBody } : responseBody;

        const error = generateError({
            requestBody: body,
            response,
            responseBody: errorResponseBody,
        });

        throw error;
    }
}

function getBody(response: Response) {
    const contentType = response.headers.get('Content-Type');
    if (contentType?.startsWith('application/json')) {
        return response.json();
    } else {
        return response.text();
    }
}

function createParams(params: FetchRequestOpts['params']) {
    return params ? `?${new URLSearchParams(params)}` : '';
}

interface FetchError extends Error {
    response?: Response;
    responseBody?: any;
    requestBody?: RequestInit['body'];
}

function generateError({
    requestBody,
    response,
    responseBody,
}: {
    requestBody: RequestInit['body'];
    response: Response;
    responseBody: any;
}) {
    const message =
        responseBody?.error ||
        response?.statusText ||
        'There was an error with the request.';

    const error: FetchError = new Error(message);

    error.response = response;
    error.responseBody = responseBody;
    error.requestBody = requestBody;

    return error;
}

interface FetchClientOpts extends FetchRequestOpts {
    baseURL?: string;
}

export class FetchClient {
    baseURL: string;
    opts: FetchRequestOpts;

    constructor(opts: FetchClientOpts = {}) {
        const { baseURL = '', ...otherOpts } = opts;
        this.baseURL = baseURL;
        this.opts = otherOpts;
    }

    /**
     * Perform a GET request with the FetchClient.
     */
    get(url?: RequestInfo, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            method: 'get',
        });
    }

    /**
     * Perform a DELETE request with the FetchClient.
     */
    delete(url?: RequestInfo, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            method: 'delete',
        });
    }

    /**
     * Perform a HEAD request with the FetchClient.
     */
    head(url?: RequestInfo, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            method: 'head',
        });
    }

    /**
     * Perform a OPTIONS request with the FetchClient.
     */
    options(url?: RequestInfo, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            method: 'options',
        });
    }

    /**
     * Perform a POST request with the FetchClient.
     */
    post(url?: RequestInfo, body?: any, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            body,
            method: 'post',
        });
    }

    /**
     * Perform a PUT request with the FetchClient.
     */
    put(url?: RequestInfo, body?: any, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            body,
            method: 'put',
        });
    }

    /**
     * Perform a PATCH request with the FetchClient.
     */
    patch(url?: RequestInfo, body?: any, opts?: FetchRequestOpts) {
        return fetchAPI(`${this.baseURL}${url}`, {
            ...opts,
            body,
            method: 'patch',
        });
    }
}