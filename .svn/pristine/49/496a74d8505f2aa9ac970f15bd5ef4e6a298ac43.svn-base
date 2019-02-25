package shared.university.admin.interceptor;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created on 2018. 5. 30.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
public class CorsFilter implements Filter {
    /**
     * Access-Control-Allow-Origin
     */
    private static final String  AC_ALLOW_ORIGIN = "Access-Control-Allow-Origin";

    /**
     * Access-Control-Allow-Methods
     */
    private static final String  AC_ALLOW_METHODS = "Access-Control-Allow-Methods";

    /**
     * Access-Control-Allow-Headers
     */
    private static final String  AC_ALLOW_HEADERS = "Access-Control-Allow-Headers";

    /**
     * Access-Control-Allow-Credentials
     */
    private static final String  AC_ALLOW_CRED = "Access-Control-Allow-Credentials";

    /**
     * Access-Control-Max-Age
     */
    private static final String  AC_MAX_AGE = "Access-Control-Max-Age";

    /**
     * Access-Control-Max-Age Value
     */
    private static final Integer DAY_IN_SECONDS = 24 * 60 * 60;

    /**
     * Origin
     */
    private static final String  REQ_HDR_ORIGIN = "Origin";

    /**
     * Access-Control-Allow-Origin Value
     */
    private static final String  AC_ALLOW_ORIGIN_ALL = "*";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest)servletRequest;
        final HttpServletResponse response = (HttpServletResponse)servletResponse;

        final String origin = request.getHeader(REQ_HDR_ORIGIN);

        response.setHeader(AC_ALLOW_ORIGIN, (origin == null || origin.isEmpty()) ? AC_ALLOW_ORIGIN_ALL : origin);
        response.setHeader(AC_ALLOW_CRED, "true");
        response.setHeader(AC_ALLOW_METHODS, "GET, POST, OPTIONS");
        response.setHeader(AC_MAX_AGE, DAY_IN_SECONDS.toString());
        response.setHeader(AC_ALLOW_HEADERS, "x-requested-with, accept, authorization, content-type, user-agent");

        // No Cache
        response.setHeader("If-Modified-Since", String.valueOf(System.currentTimeMillis()));
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Allow", "GET, POST, OPTIONS");


        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {}
}
