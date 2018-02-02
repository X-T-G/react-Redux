//判断当前平台是否为window
var cmd = process.platform === 'win32' ? 'netstat -ano' : 'ps aux';
var exec = require('child_process').exec;
//获取终端的传入的值
var port =  process.argv.splice(2);
var zy = false;
exec(cmd, function (err, stdout) {
    if (err) {
        return console.log(err);
    }
    stdout.split('\n').filter(function (line) {
        var p = line.trim().split(/\s+/);
        var address = p[1];
        if (address) {
            if (address.split(':')[1] == port) {
                zy=true;
                exec('taskkill /F /pid ' + p[4], function (err) {
                    p = p[1].split(':')[1];
                    if (err) {
                        return console.log('释放' + p + '端口失败！！');
                    }
                    console.log(p + ' 端口被成功杀掉！');
                });
            }
        }
    });
    if (!zy) {
        console.log(port + " 端口没被占用");
    }
});

// ###//用来解决端口被占用的问题，直接杀掉进程。
