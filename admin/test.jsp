<%-- 
    Document   : newjsp
    Created on : 2016-12-7, 15:25:48
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <!--<script src="js/angular.min.js" type="text/javascript"></script>-->   
        <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
    </head>
    <body>
        <div   ng-app="myApp" ng-controller="UploaderController" >
            <input type="file" file-model="myFile" >
            <button ng-click="save()" >上传</button>
        </div>
    </body>
    <script>
        var app = angular.module('myApp', []);
        app.controller('UploaderController', function($scope,$http) {
            $scope.save = function() {
                var fd = new FormData();
                var file = document.querySelector('input[type=file]').files[0];
                fd.append('logo', file);
                $http({
                    method: 'POST',
                    url: "http://192.168.1.66/youchu/rank/UploadCity",
                    data: fd,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function(response)
                {
                    //返回值
                 alert(response) ;
                });
            }
        });

    </script>
</html>
