import{_ as t,o as e,c as n,V as l}from"./chunks/framework.40f7bea3.js";const h=JSON.parse('{"title":"Deployment","description":"","frontmatter":{},"headers":[],"relativePath":"guide/deployment.md","filePath":"guide/deployment.md"}'),s={name:"guide/deployment.md"},a=l(`<h1 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;Deployment&quot;">​</a></h1><h2 id="docker-container-deployment" tabindex="-1">Docker Container Deployment <a class="header-anchor" href="#docker-container-deployment" aria-label="Permalink to &quot;Docker Container Deployment&quot;">​</a></h2><p>Docker Container Deployment is the easiest way to deploy QD.</p><blockquote><p>Please always remember to back up your database before updating or redeploying.</p></blockquote><h3 id="container" tabindex="-1">Container <a class="header-anchor" href="#container" aria-label="Permalink to &quot;Container&quot;">​</a></h3><p><strong>DockerHub URL</strong> : <a href="https://hub.docker.com/r/qdtoday/qd" target="_blank" rel="noreferrer">https://hub.docker.com/r/qdtoday/qd</a></p><blockquote><p>Tag meaning:</p><ul><li><code>latest</code>: Latest Release version</li><li><code>lite-latest</code>: Latest Release version without OCR related functions</li><li><code>ja3-latest</code>: Integrated curl-impersonate to solve the problem that ja3 fingerprint is identified as curl, does not support http3 and Quic connection</li><li><code>20xxxxxx</code>: Specify Release version, version number is represented by Release release date</li><li><code>dev</code>: Latest development version, synchronized with the latest source code, no stability guarantee</li></ul></blockquote><h3 id="deploy-method" tabindex="-1">Deploy Method <a class="header-anchor" href="#deploy-method" aria-label="Permalink to &quot;Deploy Method&quot;">​</a></h3><h4 id="_1-docker-compose-recommend" tabindex="-1">1. Docker Compose (Recommend) <a class="header-anchor" href="#_1-docker-compose-recommend" aria-label="Permalink to &quot;1. Docker Compose (Recommend)&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Create and switch to the QD directory.</span></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd/config</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Download docker-compose.yml</span></span>
<span class="line"><span style="color:#FFCB6B;">wget</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://fastly.jsdelivr.net/gh/qd-today/qd@master/docker-compose.yml</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Modify the configuration environment variables according to the requirements and configuration description</span></span>
<span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./docker-compose.yml</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Execute Docker Compose command</span></span>
<span class="line"><span style="color:#FFCB6B;">docker-compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span></span></code></pre></div><blockquote><p>See <a href="#configuration-environment-variables">Configuration</a> below for configuration description</p><p>If you don&#39;t need <code>OCR</code> or <code>hard disk space is not larger than 600M</code>, please use <strong><code>qdtoday/qd:lite-latest</code></strong> image, <strong>this image only removes OCR related functions, other than the mainline version to keep consistent</strong>.</p><p><strong>Please don&#39;t use AliCloud image source to pull Docker container, it will not pull the latest image.</strong></p></blockquote><h4 id="_2-docker-run" tabindex="-1">2. Docker Run <a class="header-anchor" href="#_2-docker-run" aria-label="Permalink to &quot;2. Docker Run&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">qd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8923</span><span style="color:#C3E88D;">:80</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd/config:/usr/src/app/config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">qdtoday/qd</span></span></code></pre></div><p>Try this command if you cannot connect to the external network inside the container:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Create container using Host network mode, port: 8923</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">qd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--env</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PORT=</span><span style="color:#F78C6C;">8923</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--net=host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd/config:/usr/src/app/config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">qdtoday/qd</span></span></code></pre></div><blockquote><p>Please note that after creating a container with this command, please change the api request of <code>http://localhost/</code> form in the template to <code>api://</code> or <code>http://localhost:8923/</code> manually in order to complete the related API request properly.</p><p><strong>Do not run both old and new versions of QD framework, or map different running QD container databases to the same file.</strong></p></blockquote><h2 id="source-code-deployment" tabindex="-1">Source Code Deployment <a class="header-anchor" href="#source-code-deployment" aria-label="Permalink to &quot;Source Code Deployment&quot;">​</a></h2><ol><li><p><strong>Version &gt;= python3.8</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Please cd to the root of the framework source code first</span></span>
<span class="line"><span style="color:#FFCB6B;">pip3</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">requirements.txt</span></span></code></pre></div></li><li><p><strong>Modify the configuration</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Execute the following command to copy the configuration file</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Modifying the content of the local_config.py file is not affected by updating the source code through git</span></span>
<span class="line"><span style="color:#FFCB6B;">cp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config.py</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local_config.py</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Modify the configuration environment variables according to the requirements and configuration description</span></span>
<span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local_config.py</span></span></code></pre></div></li><li><p><strong>Run</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">python</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./run.py</span></span></code></pre></div></li><li><p><strong>Access</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Access the web page</span></span>
<span class="line"><span style="color:#FFCB6B;">http://localhost:8923/</span></span></code></pre></div><blockquote><p>If you are using the source code deployment method, please change the api request of <code>http://localhost/</code> form in the template to <code>api://</code> or <code>http://localhost:8923/</code> manually in order to complete the related API request properly.</p><p>Templates need to be published to be displayed in &quot;Public Templates&quot;, and you need admin rights to approve them in &quot;My Publish Requests&quot;.</p></blockquote></li></ol><h2 id="configure-administrators" tabindex="-1">Configure administrators <a class="header-anchor" href="#configure-administrators" aria-label="Permalink to &quot;Configure administrators&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">python</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./chrole.py</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">your@email.address</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">admin</span></span></code></pre></div><blockquote><p>The first registered user is the administrator by default, you need to log out and then login to get full administrator rights</p></blockquote><h2 id="configuration-environment-variables" tabindex="-1">Configuration Environment Variables <a class="header-anchor" href="#configuration-environment-variables" aria-label="Permalink to &quot;Configuration Environment Variables&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">variable name</th><th style="text-align:center;">required</th><th style="text-align:center;">default value</th><th style="text-align:center;">description</th></tr></thead><tbody><tr><td style="text-align:center;">BIND</td><td style="text-align:center;">No</td><td style="text-align:center;">0.0.0.0</td><td style="text-align:center;">Listening address</td></tr><tr><td style="text-align:center;">PORT</td><td style="text-align:center;">No</td><td style="text-align:center;">8923</td><td style="text-align:center;">Listening port</td></tr><tr><td style="text-align:center;">QD_DEBUG</td><td style="text-align:center;">No</td><td style="text-align:center;">False</td><td style="text-align:center;">Whether to enable Debug mode</td></tr><tr><td style="text-align:center;">WORKER_METHOD</td><td style="text-align:center;">No</td><td style="text-align:center;">Queue</td><td style="text-align:center;">Task timing execution method, <br>The default is Queue, optional Queue or Batch, <br>Batch mode is the old version of timing task execution method, the performance is weak, <br><strong>Recommended only when Queue timed execution mode fails</strong></td></tr><tr><td style="text-align:center;">MULTI_PROCESS</td><td style="text-align:center;">No</td><td style="text-align:center;">False</td><td style="text-align:center;">(Experimental) Whether to enable multi-process mode, <br>invalid on Windows platform</td></tr><tr><td style="text-align:center;">AUTO_RELOAD</td><td style="text-align:center;">No</td><td style="text-align:center;">False</td><td style="text-align:center;">Whether to enable automatic hot reload, <br>invalid when MULTI_PROCESS=True</td></tr><tr><td style="text-align:center;">DOMAIN</td><td style="text-align:center;">No</td><td style="text-align:center;">&#39;&#39;</td><td style="text-align:center;">Specify the access domain name, <br><strong>(recommended modification)</strong>, otherwise the function of resetting password by email is not valid</td></tr><tr><td style="text-align:center;">AES_KEY</td><td style="text-align:center;">No</td><td style="text-align:center;">binux</td><td style="text-align:center;">AES encryption key, <strong>(Modification strongly recommended)</strong></td></tr><tr><td style="text-align:center;">COOKIE_SECRET</td><td style="text-align:center;">No</td><td style="text-align:center;">binux</td><td style="text-align:center;">cookie encryption key, <strong>(Modification strongly recommended)</strong></td></tr><tr><td style="text-align:center;">COOKIE_DAY</td><td style="text-align:center;">No</td><td style="text-align:center;">5</td><td style="text-align:center;">The number of days the cookie is kept in the client</td></tr><tr><td style="text-align:center;">DB_TYPE</td><td style="text-align:center;">No</td><td style="text-align:center;">sqlite3</td><td style="text-align:center;">Set to &#39;mysql&#39; when MySQL is required</td></tr><tr><td style="text-align:center;">JAWSDB_MARIA_URL</td><td style="text-align:center;">No</td><td style="text-align:center;">&#39;&#39;</td><td style="text-align:center;">When you need to use MySQL, <br> set to <code>mysql://username:password@hostname:port/database_name?auth_plugin=</code></td></tr><tr><td style="text-align:center;">QD_SQL_ECHO</td><td style="text-align:center;">No</td><td style="text-align:center;">False</td><td style="text-align:center;">Whether to enable the log output of SQLAlchmey, the default is False, <br>When set to True, the SQL statement will be output on the console, <br>allow to set to debug to enable debug mode</td></tr><tr><td style="text-align:center;">QD_SQL_LOGGING_NAME</td><td style="text-align:center;">No</td><td style="text-align:center;">QD.sql_engine</td><td style="text-align:center;">SQLAlchmey log name, default is &#39;QD.sql_engine&#39;</td></tr><tr><td style="text-align:center;">QD_SQL_LOGGING_LEVEL</td><td style="text-align:center;">No</td><td style="text-align:center;">Warning</td><td style="text-align:center;">SQLAlchmey log level, default is &#39;Warning&#39;</td></tr><tr><td style="text-align:center;">QD_SQL_ECHO_POOL</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to enable SQLAlchmey&#39;s connection pool log output, the default is True, <br>allow setting to debug to enable debug mode</td></tr><tr><td style="text-align:center;">QD_SQL_LOGGING_POOL_NAME</td><td style="text-align:center;">No</td><td style="text-align:center;">QD.sql_pool</td><td style="text-align:center;">SQLAlchmey connection pool log name, the default is &#39;QD.sql_pool&#39;</td></tr><tr><td style="text-align:center;">QD_SQL_LOGGING_POOL_LEVEL</td><td style="text-align:center;">No</td><td style="text-align:center;">Warning</td><td style="text-align:center;">SQLAlchmey connection pool log level, default is &#39;Warning&#39;</td></tr><tr><td style="text-align:center;">QD_SQL_POOL_SIZE</td><td style="text-align:center;">No</td><td style="text-align:center;">10</td><td style="text-align:center;">SQLAlchmey connection pool size, default is 10</td></tr><tr><td style="text-align:center;">QD_SQL_MAX_OVERFLOW</td><td style="text-align:center;">No</td><td style="text-align:center;">50</td><td style="text-align:center;">SQLAlchmey connection pool maximum overflow, the default is 50</td></tr><tr><td style="text-align:center;">QD_SQL_POOL_PRE_PING</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to ping before the connection pool gets a connection, the default is True</td></tr><tr><td style="text-align:center;">QD_SQL_POOL_RECYCLE</td><td style="text-align:center;">No</td><td style="text-align:center;">3600</td><td style="text-align:center;">SQLAlchmey connection pool recovery time, the default is 3600</td></tr><tr><td style="text-align:center;">QD_SQL_POOL_TIMEOUT</td><td style="text-align:center;">No</td><td style="text-align:center;">60</td><td style="text-align:center;">SQLAlchmey connection pool timeout, the default is 60</td></tr><tr><td style="text-align:center;">QD_SQL_POOL_USE_LIFO</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">SQLAlchmey whether to use LIFO algorithm, the default is True</td></tr><tr><td style="text-align:center;">REDISCLOUD_URL</td><td style="text-align:center;">No</td><td style="text-align:center;">&#39;&#39;</td><td style="text-align:center;">When you need to use Redis or RedisCloud, <br> set to <a href="http://rediscloud:password@hostname:port" target="_blank" rel="noreferrer">http://rediscloud:password@hostname:port</a></td></tr><tr><td style="text-align:center;">REDIS_DB_INDEX</td><td style="text-align:center;">No</td><td style="text-align:center;">1</td><td style="text-align:center;">The default is 1</td></tr><tr><td style="text-align:center;">QD_EVIL</td><td style="text-align:center;">No</td><td style="text-align:center;">500</td><td style="text-align:center;">(Only when the Redis connection is enabled)<br>Score = number of operation failures (such as login, verification, test, etc.) * corresponding penalty points<br>When the score reaches the upper limit of evil, it will be automatically banned until the next hour cycle</td></tr><tr><td style="text-align:center;">EVIL_PASS_LAN_IP</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to turn off the evil restriction of local private IP address users and Localhost_API requests</td></tr><tr><td style="text-align:center;">TRACEBACK_PRINT</td><td style="text-align:center;">No</td><td style="text-align:center;">False</td><td style="text-align:center;">Whether to enable to print Exception&#39;s TraceBack information in the console log</td></tr><tr><td style="text-align:center;">PUSH_PIC_URL</td><td style="text-align:center;">No</td><td style="text-align:center;"><a href="https://fastly.jsdelivr.net/gh/qd-today/qd@master/web/static/img/push_pic.png" target="_blank" rel="noreferrer">push_pic.png</a></td><td style="text-align:center;">The default is [push_pic.png](https 😕/fastly.jsdelivr.net/gh/qd-today/qd@master/web/static/img/push_pic.png)</td></tr><tr><td style="text-align:center;">PUSH_BATCH_SW</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to allow periodic push of QD task logs, the default is True</td></tr><tr><td style="text-align:center;">MAIL_SMTP</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Email SMTP server</td></tr><tr><td style="text-align:center;">MAIL_PORT</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Email SMTP server port</td></tr><tr><td style="text-align:center;">MAIL_USER</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Email username</td></tr><tr><td style="text-align:center;">MAIL_PASSWORD</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Email password</td></tr><tr><td style="text-align:center;">MAIL_FROM</td><td style="text-align:center;">No</td><td style="text-align:center;">MAIL_USER</td><td style="text-align:center;">The Email used when sending, the default is the same as MAIL_USER</td></tr><tr><td style="text-align:center;">MAIL_DOMAIN_HTTPS</td><td style="text-align:center;">No</td><td style="text-align:center;">False</td><td style="text-align:center;">Whether to use HTTPS for email domain name. <br>Not the framework itself HTTPS configuration. <br>If you need HTTPS, please use an external reverse proxy</td></tr><tr><td style="text-align:center;">PROXIES</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Global proxy domain name list, separated by &quot;|&quot;</td></tr><tr><td style="text-align:center;">PROXY_DIRECT_MODE</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Global proxy blacklist mode, not enabled by default <br>&quot;url&quot; is URL matching mode; &quot;regexp&quot; is regular expression matching mode</td></tr><tr><td style="text-align:center;">PROXY_DIRECT</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Global proxy blacklist matching rules</td></tr><tr><td style="text-align:center;">NEW_TASK_DELAY</td><td style="text-align:center;">No</td><td style="text-align:center;">1</td><td style="text-align:center;">Preparation time after new task, default is 1 second</td></tr><tr><td style="text-align:center;">TASK_WHILE_LOOP_TIMEOUT</td><td style="text-align:center;">No</td><td style="text-align:center;">900</td><td style="text-align:center;">Maximum runtime of a single While loop during a task run, <br>the default is 15 minutes</td></tr><tr><td style="text-align:center;">TASK_REQUEST_LIMIT</td><td style="text-align:center;">No</td><td style="text-align:center;">1500</td><td style="text-align:center;">Maximum number of requests per task run, <br>the default is 1500</td></tr><tr><td style="text-align:center;">USE_PYCURL</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to enable Pycurl module</td></tr><tr><td style="text-align:center;">ALLOW_RETRY</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">When some requests in the Pycurl environment may cause Request errors, <br>automatically modify the conflict settings and resend the request</td></tr><tr><td style="text-align:center;">DNS_SERVER</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Use specified DNS for resolution via Curl (only supports Pycurl environment), <br>such as 8.8.8.8</td></tr><tr><td style="text-align:center;">CURL_ENCODING</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to allow to use Curl for Encoding operation</td></tr><tr><td style="text-align:center;">CURL_CONTENT_LENGTH</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">Whether to allow Curl to use custom Content-Length request in Headers</td></tr><tr><td style="text-align:center;">NOT_RETRY_CODE</td><td style="text-align:center;">No</td><td style="text-align:center;"><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">See configuration for details</a>...</td><td style="text-align:center;"><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">See configuration for details</a>...</td></tr><tr><td style="text-align:center;">EMPTY_RETRY</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;"><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">See configuration for details</a>...</td></tr><tr><td style="text-align:center;">USER0ISADMIN</td><td style="text-align:center;">No</td><td style="text-align:center;">True</td><td style="text-align:center;">The first registered user is an administrator, False to close</td></tr><tr><td style="text-align:center;">EXTRA_ONNX_NAME</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Customize the ONNX file name in the config directory<br>(do not fill in the &quot;.onnx&quot; suffix)<br>Separate multiple onnx file names with &quot;|&quot;</td></tr><tr><td style="text-align:center;">EXTRA_CHARSETS_NAME</td><td style="text-align:center;">No</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">Custom ONNX in the config directory corresponds to the custom charsets.json file name<br>(do not fill in the &quot;.json&quot; suffix)<br>Multiple json file names are separated by &quot;|&quot;</td></tr><tr><td style="text-align:center;">WS_PING_INTERVAL</td><td style="text-align:center;">No</td><td style="text-align:center;">5</td><td style="text-align:center;">WebSocket ping interval, the default is 5 seconds</td></tr><tr><td style="text-align:center;">WS_PING_TIMEOUT</td><td style="text-align:center;">No</td><td style="text-align:center;">30</td><td style="text-align:center;">WebSocket ping timeout, the default is 30 seconds</td></tr><tr><td style="text-align:center;">WS_MAX_MESSAGE_SIZE</td><td style="text-align:center;">No</td><td style="text-align:center;">10485760</td><td style="text-align:center;">WebSocket maximum message size, the default is 10485760 bytes</td></tr><tr><td style="text-align:center;">WS_MAX_QUEUE_SIZE</td><td style="text-align:center;">No</td><td style="text-align:center;">100</td><td style="text-align:center;">WebSocket maximum queue size, the default is 100</td></tr><tr><td style="text-align:center;">WS_MAX_CONNECTIONS_SUBSCRIBE</td><td style="text-align:center;">No</td><td style="text-align:center;">30</td><td style="text-align:center;">WebSocket subscribe page maximum number of connections, the default is 30</td></tr><tr><td style="text-align:center;">SUBSCRIBE_ACCELERATE_URL</td><td style="text-align:center;">No</td><td style="text-align:center;">jsdelivr_cdn</td><td style="text-align:center;">Subscribe page acceleration URL, the default is jsdelivr_cdn, <br><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">See configuration for details</a>...</td></tr></tbody></table><blockquote><p>For details, please refer to <a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">config.py</a></p></blockquote>`,24),o=[a];function r(d,i,c,p,y,g){return e(),n("div",null,o)}const x=t(s,[["render",r]]);export{h as __pageData,x as default};
