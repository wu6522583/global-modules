package com.easyway.html5.canvas;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import sun.misc.BASE64Decoder;

/**
 * 
 * Servlet implementation class Base64ToImages
 */
public class Base64ToImages extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Base64ToImages() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		 base64toImage(request, response);
	}

	/**
	 * 处理base64转化image的方法
	 * @param request
	 */
	public void base64toImage(HttpServletRequest request, HttpServletResponse response) {
		try {
			String base64data = request.getParameter("imageData");
			String imageData=base64data.split(",")[1];
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] imgBytes = decoder.decodeBuffer(imageData);
			for (int i = 0; i < imgBytes.length; ++i) {
				if (imgBytes[i] < 0) {// 调整异常数据
					imgBytes[i] += 256;
				}
			}
			//保存特定的目录下面
			String imagepath = getServletContext().getRealPath("/images");
			System.out.println("imagepath="+imagepath);
			File dir=new File(imagepath);
			if(!dir.exists()){
				dir.mkdirs();
			}
			String filename=new Date().getTime()+".png";
			File decFile = new File(imagepath+File.separator+filename);
			String dd=decFile.getAbsolutePath();
			if(decFile.exists()){
				decFile.delete();
			}
			decFile.createNewFile();
			FileOutputStream ops = new FileOutputStream(decFile);
			ops.write(imgBytes, 0, imgBytes.length);
			ops.flush();
			ops.close();
			
			response.setContentType("text/html;charset=utf-8");
			response.setCharacterEncoding("utf-8");
			String contextPath = request.getScheme() + "://" + request.getServerName()
			+ ":" + request.getServerPort() + request.getContextPath();
			String image_url = contextPath + "/images/" + filename;
			response.getWriter().print("<img src='" + image_url + "' />");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
