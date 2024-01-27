package com.instakart.helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class ImageHandler  {
	 private final static  String DIR ="D:\\Ecommerce\\Com.Instakart\\Instarkart\\src\\main\\resources\\static\\product_images";
	private final  String DIRr = new ClassPathResource("/static/product_images/").getFile().getAbsolutePath();
	public ImageHandler() throws Exception {}

	public String saveImage(MultipartFile imageFile) {
			try {
				String filePath = DIR+File.separator+imageFile.getOriginalFilename();
						Files.copy(
								imageFile.getInputStream(), 
								Paths.get(DIRr+File.separator+imageFile.getOriginalFilename()),
								StandardCopyOption.REPLACE_EXISTING);
						Files.copy(
								imageFile.getInputStream(), 
								Paths.get(filePath),
								StandardCopyOption.REPLACE_EXISTING);

			} catch (IOException e) {
				e.printStackTrace();
				
			}
			 return  ServletUriComponentsBuilder.fromCurrentContextPath().path("/product_images/").path(imageFile.getOriginalFilename()).toUriString();
	}
}
