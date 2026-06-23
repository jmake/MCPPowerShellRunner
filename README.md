# PowerShellRunner

When the agent attempts to execute programs located on drives other than `C:`, some issues arise.  
These problems seem to be related to antigravity's own `run_command` tool (in my case). This MCP fixes that.

---
### Setup 

In the configuration file located at ~/.gemini/config/mcp_config.json.

```
...

    "powershell-runner": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/jmake/PowerShellRunner.git#version2"
      ],
      "env": {}
    }
...
```

--- 

### Examples 

- Launch isaac-sim 
```
Start-Process D:\z2025_1\IsaacSim500\isaac-sim.bat
```

- Execute a script saving outputs to _out.txt_ and errors to _err.txt_.
```
Start-Process -FilePath "powershell.exe" -ArgumentList "-Command `" & 'path\to\script.py' `"" -RedirectStandardOutput "out.txt" -RedirectStandardError "err.txt"
```

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/84d806a5-f6ff-4100-a9eb-88a5657330c6" />


---
### Testing MCP server 

```
npm install @modelcontextprotocol/sdk
```

```
node server.js ## spicy-server running on stdio 
```

```
npx @modelcontextprotocol/inspector node server.js
```


<img width="1613" height="760" alt="image" src="https://github.com/user-attachments/assets/6095b37b-fdb4-484a-8edd-83c7cba4871a" />


<img width="1920" height="929" alt="image" src="https://github.com/user-attachments/assets/e2b38912-519e-469f-ab48-2803f14af3dd" />





